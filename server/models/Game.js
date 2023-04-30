const mongoose = require("mongoose");

const { Schema } = mongoose;

const gameSchema = new Schema({
  gameName: {
    type: String,
    trim: true,
  },
  player1: {
    type: String,
    trim: true,
  },
  player2: {
    type: String,
    required: true,
    unique: true,
  },
  player1Score: {
    type: Number,
  },
  player2Score: {
    type: Number,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
