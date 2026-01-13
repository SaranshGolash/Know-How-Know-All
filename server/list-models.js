// server/list-models.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function list() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    // This fetches the raw list of models from Google
    const modelResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await modelResponse.json();

    console.log("=== YOUR AVAILABLE MODELS ===");
    if (data.models) {
      data.models.forEach((m) => {
        // We only care about models that support "generateContent"
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`✅ ${m.name.replace("models/", "")}`);
        }
      });
    } else {
      console.log("No models found. Check API Key permissions.");
      console.log("Error details:", data);
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

list();
