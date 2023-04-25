const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Score {
  _id: ID!
  score: Float
  category: String
  user: User!
}

type User {
  _id: ID!
  firstName: String!
  lastName: String!
  email: String!
  scores: [Score]
}

type Auth {
  token: String!
  user: User!
}

type Query {
  user(_id: ID): User
  users: [User]
  scores:[Score]
}

type Mutation {
  addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  updateUser(firstName: String, lastName: String, email: String, password: String): User
  addScore(score: Float, category: String, userId: ID!): Score
  updateScore(id: ID!, score: Int!): Score
}
`;

module.exports = typeDefs;
