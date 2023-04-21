const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
