const { AuthenticationError } = require("apollo-server-express");
const { User, Score } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("scores");
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      const users = await User.find().populate("scores");
      return users;
    },
    scores: async (parent, args, context) => {
      const user = await User.findById(parent.user);
      return user.scores;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    addScore: async (parent, { score, category, user }, context) => {
      if (context.user) {
        const newScore = await Score.create({ score, category, user: context.user._id });
        const updatedUser = await User.findByIdAndUpdate(
          user,
          { $push: { scores: newScore } },
          { new: true }
        );
    
        console.log(updatedUser);
    
        return newScore;
      }
    
      throw new AuthenticationError("Not logged in");
    },

    updateScore: async (parent, { scoreId, updatedScore }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const updated = await User.updateScore(scoreId, updatedScore);
        return updated;
      }

      throw new AuthenticationError("Not logged in");
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