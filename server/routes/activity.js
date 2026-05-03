const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// SAVE ACTIVITY
router.post("/", async (req, res) => {
    try {
        const { url, timeSpent } = req.body;

        if (!url || !timeSpent) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const activity = new Activity({ url, timeSpent });
        await activity.save();

        res.json({ message: "Saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET TODAY REPORT
router.get("/today", async (req, res) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const data = await Activity.find({ date: { $gte: start } });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;