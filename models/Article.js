const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide a name"],
    trim: true,
    maxlength: [20, "name cannot exceed 20 characters"],
  },
  description: {
    type: String,
    required: [true, "You must provide a name"],
    trim: true,
    maxlength: [100, "name cannot exceed 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Articles", ArticleSchema);
