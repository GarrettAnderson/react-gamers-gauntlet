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

  type Game {
    _id: ID
    name: String
    player1: String
    player2: String
    player1Score: Int
    player2Score: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(_id: ID, token: String): User
    game(_id: ID): Game
    users: [User]
    games: [Game]
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
    addGame(
      name: String
      player1: String
      player2: String
      player1Score: Int
      player2Score: Int
    ): Game
    deleteScore(_id: ID): Score
    deleteGame(_id: ID): Game
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
