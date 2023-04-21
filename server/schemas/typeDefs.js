const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    score: Int
  }

  type Score {
    _id: ID
    score: Int
    user_id(id: ID!): User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    score: Score
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
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
