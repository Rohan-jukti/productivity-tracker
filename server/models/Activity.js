const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    url: String,
    timeSpent: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Activity", ActivitySchema);