// server/test-ai.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  console.log("Testing API Key connection...");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // We test the base Flash model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent("Hello, are you online?");
    console.log("✅ SUCCESS! AI Replied:", result.response.text());
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    console.log(
      "\nIf 1.5-flash failed, try 'gemini-1.0-pro' in your index.js file."
    );
  }
}

test();
