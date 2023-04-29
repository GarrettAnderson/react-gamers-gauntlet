import gql from "graphql-tag";

export const QUERY_USER = gql`
  {
    user {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_SCORE = gql`
  {
    score {
      _id
      score
      user_id {
        email
        firstName
        lastName
      }
    }
  }
`;
