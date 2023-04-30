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
  mutation addScore($score: Int!, $user_id: ID!) {
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

export const CREATE_GAME = gql`
  mutation addGame(
    $name: String
    $player1: String
    $player2: String
    $player1Score: Int
    $player2Score: Int
  ) {
    addGame(
      name: $name
      player1: $player1
      player2: $player2
      player1Score: $player1Score
      player2Score: $player2Score
    ) {
      _id
      name
      player1
      player2
      player1Score
      player2Score
    }
  }
`;
