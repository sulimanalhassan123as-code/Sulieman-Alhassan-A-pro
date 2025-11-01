// File: /api/gemini.js
// This version is configured to use the powerful Gemini 1.5 Pro model.

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function handler(req, res) {
  // 1. Ensure this function only handles POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 2. Securely access the API key from Vercel's environment variables
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 3. Get the user's prompt from the request body
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: { message: 'Prompt is required.' } });
    }

    // 4. --- THIS IS THE ONLY CHANGE ---
    //    Specify the Gemini 2.5 Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    // 5. Generate the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 6. Send the AI's response back to the frontend
    return res.status(200).json({ reply: text });

  } catch (error) {
    // 7. Handle any errors that occur
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({ error: { message: 'Failed to fetch response from the AI model.' } });
  }
}

module.exports = handler;
