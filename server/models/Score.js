const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  
  
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
