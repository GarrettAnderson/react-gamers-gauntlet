const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const Score = require("./Score");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

userSchema.methods.updateScore = async function (scoreId, updatedScore) {
  const scoreIndex = this.scores.findIndex((score) => score.id === scoreId);
  if (scoreIndex === -1) {
    throw new Error("Score not found");
  }

  const scoreToUpdate = this.scores[scoreIndex];
  Object.assign(scoreToUpdate, updatedScore);
  await this.save();

  return scoreToUpdate;
};

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
