import gql from 'graphql-tag';

export const GET_ME = gql`
{
    me {
      _id
      username
      questionsAnswered
      questionsCorrect
      correctPercent
      title
    }
  }
`;