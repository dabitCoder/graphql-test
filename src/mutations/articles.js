import { gql } from "@apollo/client";

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $url: String!, $language: String!) {
    createArticle(title: $title, url: $url, language: $language) {
      title
      url
      language
    }
  }
`;
