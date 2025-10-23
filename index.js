import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// ✅ This fetches passes even when Inventory API fails
app.get("/v1/users/:userId/assets/9", async (req, res) => {
  const userId = req.params.userId;
  const target = `https://economy.roblox.com/v2/users/${userId}/game-passes?sortOrder=Asc&limit=100`;

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "RobloxProxy/1.0",
        "Accept": "application/json"
      }
    });

    const body = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.status(response.status).send(body);
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Failed to fetch from Roblox" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
