const mongoose = require("mongoose");

const BisinessIdea = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  bisinessDefinition: {
    type: mongoose.Schema.ObjectId,
    ref: "bisinessDefinition",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    required: true,
  },
  ideaSrengthPersentage: {
    type: Number,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("bisinessDefinition", BisinessDefinition);
