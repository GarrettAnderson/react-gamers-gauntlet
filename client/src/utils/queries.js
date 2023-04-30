import gql from "graphql-tag";

export const QUERY_USER = gql`
  query user($token: String) {
    user(token: $token) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_SCORES = gql`
  {
    scores {
      _id
      score
      user_id {
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_USERS = gql`
  {
    users {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const GET_GAMES = gql`
  {
    games {
      _id
      name
      player1
      player2
      player1Score
      player2Score
    }
  }
`;

export const GET_GAME = gql`
  query game($id: ID) {
    game(_id: $id) {
      _id
      name
      player1
      player2
      player1Score
      player2Score
    }
  }
`;
