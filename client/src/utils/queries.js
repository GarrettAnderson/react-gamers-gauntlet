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
