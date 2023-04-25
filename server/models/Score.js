const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
