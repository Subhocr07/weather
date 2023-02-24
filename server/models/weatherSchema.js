const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  city: String,
  timestamp: { type: Date, default: Date.now },
  userId: String,
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
