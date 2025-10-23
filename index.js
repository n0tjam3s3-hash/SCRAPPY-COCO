import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// 🧭 Route to fetch the user's gamepasses
app.get("/v1/users/:userId/assets/9", async (req, res) => {
  const userId = req.params.userId;
  const target = `https://inventory.roblox.com/v1/users/${userId}/assets/9`;

  try {
    const response = await fetch(target);
    const body = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.status(response.status).send(body);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Failed to fetch from Roblox" });
  }
});

// 🚀 Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});

