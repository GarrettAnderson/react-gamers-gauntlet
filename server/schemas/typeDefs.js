const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    scores: [Score]
  }

  type Score {
    _id: ID
    score: Int
    user_id: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
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
      firstName: String
      lastName: String
      email: String
      password: String
      score: Int
    ): User
    addScore(userId: ID, score: Int): Score
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
