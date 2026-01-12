const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { WebSocketServer } = require("ws");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// AUTHENTICATION ROUTES

// SIGNUP ROUTE
app.post("/auth/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json({ message: "User already exists!" });
    }

    // Hash the password (Encryption)
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Insert into Database
    const newUser = await pool.query(
      "INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [fullName, email, bcryptPassword]
    );

    // Generate JWT Token
    const token = jwt.sign(
      { user_id: newUser.rows[0].user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Signup successful!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// LOGIN ROUTE
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Password or Email is incorrect" });
    }

    // Compare Password (User input vs Database Hash)
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Password or Email is incorrect" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { user_id: user.rows[0].user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.rows[0].user_id,
        name: user.rows[0].full_name,
        email: user.rows[0].email,
      },
      message: "Login successful!",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Payment Gateway

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { products, userId } = req.body;

    // Create line items for Stripe
    // (We accept an array of products, even if it's just 1 item)
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          description: product.description,
        },
        unit_amount: Math.round(product.price * 100), // Stripe expects cents (e.g. $49.99 -> 4999)
      },
      quantity: 1,
    }));

    // Create the Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // Redirect URLs
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      // METADATA: Pass info we need to store in DB later
      metadata: {
        userId: userId,
        courseTitle: products[0].title, // Assuming single course purchase for now
        amount: products[0].price,
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Verifying and saving to database route

app.post("/payment-success", async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Retrieve the session from Stripe to ensure it's real
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const { userId, courseTitle, amount } = session.metadata;

      // Save to Database
      const newPurchase = await pool.query(
        "INSERT INTO purchases (user_id, course_title, amount) VALUES ($1, $2, $3) RETURNING *",
        [userId, courseTitle, amount]
      );

      return res.json({ success: true, purchase: newPurchase.rows[0] });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment not completed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route for getting user's purchased courses

app.get("/user/purchases/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await pool.query(
      "SELECT * FROM purchases WHERE user_id = $1 ORDER BY purchase_date DESC",
      [userId]
    );
    res.json(purchases.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// WEBSOCKET SERVER (For AI Teacher)
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected to AI Teacher");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  let chatSession = null;

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);

      // Initialize Chat with Context if it is the first message
      if (data.type === "init") {
        chatSession = model.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an expert AI Tutor for the course: ${data.courseTitle}. 
                
                Your Goal:
                1. Observe the student's video feed (they might show code, diagrams, or their face).
                2. If they are struggling, offer hints.
                3. If they ask a question, answer concisely.
                4. Keep responses short and conversational (under 2 sentences) because you will be speaking them out loud.
                `,
                },
              ],
            },
          ],
        });
        ws.send(
          JSON.stringify({ type: "ready", text: "I am ready to teach!" })
        );
      }

      // Handle Live Frame/Audio Data
      else if (data.type === "stream" && chatSession) {
        // data.image should be a base64 string of the webcam frame
        // data.text (optional) could be speech-to-text input

        const result = await chatSession.sendMessage([
          {
            text:
              "Analyze this frame from my webcam and my question: " +
              (data.prompt || "What am I showing you/What should I do next?"),
          },
          { inlineData: { mimeType: "image/jpeg", data: data.image } },
        ]);

        const responseText = result.response.text();

        ws.send(JSON.stringify({ type: "ai_response", text: responseText }));
      }
    } catch (error) {
      console.error("AI Error:", error);
      ws.send(JSON.stringify({ type: "error", text: "AI is thinking..." }));
    }
  });
});

console.log("WebSocket Server running on port 8080");
