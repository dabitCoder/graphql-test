import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query getArticles {
    allArticles {
      id
      title
      url
    }
  }
`;
