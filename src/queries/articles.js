import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query getArticles($page: Int, $pageSize: Int) {
    paginatedArticles(page: $page, pageSize: $pageSize) {
      entries {
        id
        title
        url
        language
      }
      meta {
        pageNumber
        pageSize
      }
    }
  }
`;
