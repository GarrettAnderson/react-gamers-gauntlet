const { AuthenticationError } = require("apollo-server-express");
const { User, Score, Game } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args) => {
      const users = await User.find();
      return users;
    },
    games: async (parent, args) => {
      const games = await Game.find();
      return games;
    },
    game: async (parent, args, context) => {
      console.log(args);
      const game = await Game.findById(args._id);
      console.log("current game detail", game);
      return game;
    },
    user: async (parent, args, context) => {
      console.log("token", args.token);
      console.log("user info", context.user);
      if (context.user) {
        const user = await User.findById(context.user._id);
        console.log("user detail", user);
        return user;
      }

      // throw new AuthenticationError("Not logged in");
    },

    scores: async (parent, args, context) => {
      const score = await Score.find().populate({
        path: "user_id",
        model: "User",
      });
      console.log("scores: ", score);
      return score;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addGame: async (parent, args, context) => {
      console.log(args);
      const newGame = await Game.create(args);
      // console.log(newGame);
      return newGame;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    addScore: async (parent, { score, user_id }, context) => {
      console.log(score, user_id);
      const newScore = await Score.create({ score: score, user_id: user_id });
      console.log(newScore);

      return newScore;

      // throw new AuthenticationError("Not logged in");
    },
    deleteScore: async (parent, args, context) => {
      console.log(args);
      return await Score.findByIdAndDelete(args._id);
    },
    deleteGame: async (parent, args, context) => {
      console.log(args);
      return await Game.findByIdAndDelete(args._id);
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
