import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

export const handleChat = async (req, res) => {
  try {
    const { prompt, history } = req.body;
    let filePart = null;

    if (req.file) {
      // If there's an uploaded file (image), we can convert it to base64 for Gemini
      const fileData = fs.readFileSync(req.file.path).toString('base64');
      filePart = {
        inlineData: {
          data: fileData,
          mimeType: req.file.mimetype,
        },
      };
      
      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);
    }

    // Initialize the SDK
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // If no API key is provided, return a mock response
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        response: `[MOCK MODE - Missing GEMINI_API_KEY] I received your message: "${prompt}". ${
          req.file ? `I also received an attachment: ${req.file.originalname}.` : ''
        } Please add your API key to .env to enable real AI responses!`
      });
    }

    const contents = [];
    
    // Convert history if provided
    if (history && Array.isArray(JSON.parse(history))) {
        // Simplified history appending (In real production, parse history into correct Gemini format)
    }

    const currentMessage = {
        role: 'user',
        parts: filePart ? [filePart, { text: prompt }] : [{ text: prompt }]
    };
    contents.push(currentMessage);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Failed to process chat request' });
  }
};
