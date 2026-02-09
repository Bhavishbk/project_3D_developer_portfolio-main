// Simple local AI proxy server to call OpenAI. Run with: node ai-server.js
// Requires environment variable OPENAI_API_KEY

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.warn("Warning: OPENAI_API_KEY not set. Set it in .env before running the server.");
}

// Load local portfolio data for context
let portfolio = {};
try {
  portfolio = require("./data/portfolio.json");
} catch (e) {
  console.warn("Could not load portfolio.json:", e.message);
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: "Missing message" });

  try {
    const systemPrompt = `You are an assistant that only answers questions about the portfolio owner. Use ONLY the provided portfolio data below when answering. If the user asks something outside this portfolio, politely decline. Portfolio JSON: ${JSON.stringify(
      portfolio
    )}`;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 500,
      }),
    });

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`AI proxy server running on http://localhost:${port}`));
