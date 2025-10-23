import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// 🧭 Route to get gamepasses for a user
app.get("/v1/users/:userId/assets/9", async (req, res) => {
  const userId = req.params.userId;

  // ✅ More reliable endpoint than inventory.roblox.com
  const target = `https://economy.roblox.com/v2/users/${userId}/game-passes?sortOrder=Asc&limit=100`;

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "RobloxProxy/1.0",
        "Accept": "application/json"
      }
    });

    // forward raw text
    const body = await response.text();

    // pass through headers and status
    res.setHeader("Content-Type", "application/json");
    res.status(response.status).send(body);
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Failed to fetch from Roblox" });
  }
});

// 🛡️ Fallback route
app.get("/", (req, res) => {
  res.send("✅ Roblox Gamepass Proxy is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
