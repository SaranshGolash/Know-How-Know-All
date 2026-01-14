const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { WebSocketServer } = require("ws");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// AUTHENTICATION ROUTES

// Signup Route
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

// Login route
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

// GAMIFICATION ENDPOINTS

// Getting User Stats (XP & Streak)

app.get("/user/stats/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT xp_points, current_streak FROM users WHERE user_id = $1",
      [id]
    );

    if (user.rows.length === 0) return res.json({ xp: 0, streak: 0 });

    // Calculate Level: Level 1 = 0-99XP, Level 2 = 100-199XP, etc.
    const xp = user.rows[0].xp_points;
    const level = Math.floor(xp / 100) + 1;

    res.json({ xp, level, streak: user.rows[0].current_streak });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Adding XP when user wins the quiz

app.put("/user/add-xp", async (req, res) => {
  try {
    const { userId, xp } = req.body;

    // Update XP in DB
    const update = await pool.query(
      "UPDATE users SET xp_points = xp_points + $1 WHERE user_id = $2 RETURNING xp_points",
      [xp, userId]
    );

    res.json({ message: "XP Added", newXP: update.rows[0].xp_points });
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

  const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });
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
                  text: `You are an AI Video Tutor for: ${data.courseTitle}. 
                    
                    IMPORTANT INSTRUCTIONS:
                    1. You are speaking in a video call. Keep answers SHORT and conversational (1-2 sentences).
                    2. Do not use markdown (no **bold** or # headings), just plain text.
                    3. If the user shows code, correct it briefly.
                    4. Be encouraging and energetic.
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
      else if (
        (data.type === "stream" || data.type === "quiz") &&
        chatSession
      ) {
        let promptText = data.prompt;

        // 1. If it's a Quiz Request, force JSON format
        if (data.type === "quiz") {
          promptText = `Generate 3 multiple-choice questions about ${data.courseTitle}. 
            CRITICAL: Return ONLY a raw JSON array. No markdown code blocks. No intro text.
            Format: [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "answer": "The correct string"}]`;
        }

        // 2. Send to Gemini
        const result = await chatSession.sendMessage([
          { text: promptText },
          // Only attach image if provided (quizzes usually don't need the camera)
          ...(data.image
            ? [{ inlineData: { mimeType: "image/jpeg", data: data.image } }]
            : []),
        ]);

        let responseText = result.response.text();

        // 3. Clean up Gemini's response (It often wraps JSON in ```json ... ```)
        if (data.type === "quiz") {
          responseText = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          // Send back as a special 'quiz_data' type
          ws.send(
            JSON.stringify({
              type: "quiz_data",
              data: JSON.parse(responseText),
            })
          );
        } else {
          // Standard chat response
          ws.send(JSON.stringify({ type: "ai_response", text: responseText }));
        }
      }
    } catch (error) {
      console.error("AI Error:", error);
      ws.send(JSON.stringify({ type: "error", text: "AI is thinking..." }));
    }
  });
});

console.log("WebSocket Server running on port 8080");
