const { AuthenticationError } = require("apollo-server-express");
const { User, Score } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args) => {
      const users = await User.find();
      return users;
    },
    user: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    scores: async (parent, args, context) => {
      const score = await Score.find().populate({
        path: "user_id",
        model: "User",
      });
      console.log(score);
      return score;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    addScore: async (parent, { score, userId }, context) => {
      console.log(score, userId);
      const newScore = await Score.create({ score: score, user_id: userId });
      console.log(newScore);

      return newScore;

      // throw new AuthenticationError("Not logged in");
    },
    deleteScore: async (parent, args, context) => {
      console.log(args);
      return await Score.findByIdAndDelete(args._id);
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
