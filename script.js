// File: /api/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// This function will be executed by Vercel when the /api/gemini endpoint is called
export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2. Securely get the API key from environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ error: { message: 'Server configuration error: API key not found.' } });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 3. Get the user's prompt from the request body
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: { message: 'Prompt is required.' } });
    }

    // 4. --- CRITICAL FIX: Use the correct, available model name ---
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // 5. Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 6. Send the AI's response back to the frontend
    return res.status(200).json({ reply: text });

  } catch (error) {
    // 7. Handle any errors during the API call
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({ error: { message: 'Failed to get a response from the AI model.' } });
  }
}
