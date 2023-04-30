const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema({
  name: {
    type: String,
    default: "New Game",
  },
  player1: {
    type: String,
    default: "Player 1",
  },
  player2: {
    type: String,
    default: "Player 2",
  },
  player1Score: {
    type: Number,
    default: 0,
  },
  player2Score: {
    type: Number,
    default: 0,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
