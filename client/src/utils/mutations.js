import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $email: String!
    $questionsAnswered: Int!
    $questionsCorrect: Int!
  ) {
    updateUser(
      user: $email
      questionsAnswered: $questionsAnswered
      questionsCorrect: $questionsCorrect
    ) {
      _id
      email: email
      questionsCorrect
      questionsAnswered
      correctPercent
      title
    }
  }
`;

export const ADD_SCORE = gql`
  mutation AddScore($score: Int!, $user_id: ID!) {
    addScore(score: $score, user_id: $user_id) {
      _id
      score
      user_id {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;
