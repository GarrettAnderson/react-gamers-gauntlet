const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Score {
    _id: ID
    score: Int
    user_id: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(_id: ID): User
    users: [User]
    scores: [Score]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      _id: ID
      firstName: String
      lastName: String
      email: String
      password: String
      score: Int
    ): User
    addScore(user_id: ID, score: Int): Score
    addGame() : Game
    deleteScore(_id: ID): Score
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
