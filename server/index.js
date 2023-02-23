const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());
app.use(cors());

// Define port
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/weather")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));

// Test route
app.get("/", (req, res) => res.send("Server up and running"));
