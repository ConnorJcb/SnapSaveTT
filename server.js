const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/download", async (req, res) => {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "Missing TikTok URL" });

    try {
        const response = await axios.get("https://tikwm.com/api/", {
            params: { url },
        });

        const videoUrl = response.data?.data?.play;

        if (!videoUrl) {
            return res.status(500).json({ error: "Failed to fetch video" });
        }

        res.json({ video: videoUrl });
    } catch (err) {
        console.error("Backend error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
