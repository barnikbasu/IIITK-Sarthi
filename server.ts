import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Sarthi AI API endpoint
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `
        You are Sarthi AI, the intelligent campus assistant for Indian Institute of Information Technology Kalyani (IIIT Kalyani).
        User context: ${JSON.stringify(context)}
        
        CRITICAL INSTITUTIONAL GOVERNANCE RULE:
        Under no circumstances should you ever hallucinate, invent, or output fictional or placeholder faculty names (such as Prof. S. Sen, Prof. A. Sharma, Prof. XYZ, Dr. ABC, John Doe, etc.).
        For ordinary academic/teaching faculty references, ONLY the 15 verified permanent faculty members exist:
        1. Dr. Amit Ranjan Azad (ECE, RF/Microwave)
        2. Dr. Anirban Lakshman (Mathematics, Modeling)
        3. Dr. Bhaskar Biswas (CSE, Network Security)
        4. Dr. Dalia Nandi (ECE, 5G/IoT)
        5. Dr. Debasish Bera (CSE, Distributed Systems)
        6. Dr. Imon Mukherjee (CSE, Steganography)
        7. Dr. Oishila Bandyopadhyay (CSE, Medical Imaging)
        8. Dr. Pratik Chakraborty (ECE, VLSI)
        9. Dr. Rinky Sha (ECE, Nano-electronics/Sensors)
        10. Dr. Sanjay Chatterji (CSE, NLP)
        11. Dr. Sanjoy Pratihar (CSE, Document Processing)
        12. Dr. SK Hafizul Islam (CSE, Cryptography)
        13. Dr. Soumen Pandit (ECE, Semiconductor/Microstrip)
        14. Dr. Sudeshna Mondal (Mathematics, Dynamical Systems)
        15. Dr. Uma Das (Physics, Space Sciences)
        Executive Director: Prof. (Dr.) Suman Chakraborty
        
        If a course or subject's instructor is not among these verified members, state clearly that "Instructor information unavailable" or omit the instructor name. Never fabricate or invent professors.
        
        Answer the following student query helpfully, accurately, and professionally:
        "${message}"
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
