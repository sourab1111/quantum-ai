import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_KEY = "PASTE_GEMINI_KEY_HERE";
const HF_KEY = "PASTE_HUGGINGFACE_KEY_HERE";

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// CHAT API
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // 👉 Try Gemini first
    const gRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    if (!gRes.ok) throw new Error("Gemini failed");

    const gData = await gRes.json();
    const reply =
      gData.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

    return res.json({ reply, model: "gemini" });
  } catch (e) {
    // 👉 Fallback to HuggingFace
    try {
      const hRes = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-large",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: message }),
        }
      );

      const hData = await hRes.json();
      const reply = hData?.[0]?.generated_text || "No reply";

      return res.json({ reply, model: "huggingface" });
    } catch (err) {
      res.status(500).json({ error: "Both AI failed" });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
