// File: /api/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  // Ensure we are using the POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // SECURELY access the API key from Vercel's environment variables
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: { message: 'Prompt is required.' } });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Send the successful response back to the frontend
    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({ error: { message: 'Failed to fetch response from AI.' } });
  }
                                         }
