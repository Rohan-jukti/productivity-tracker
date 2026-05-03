const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const activityRoutes = require("./routes/activity");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/productivity")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes
app.use("/api/activity", activityRoutes);

// start server
app.listen(5000, () => console.log("Server running on port 5000"));