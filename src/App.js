import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Spinner } from "@chakra-ui/react";

import { GET_ARTICLES } from "./queries/articles";
import Table from "./Table";
import Form from "./Form";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, data, fetchMore } = useQuery(GET_ARTICLES, {
    variables: { page: currentPage, pageSize: 5 },
  });

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
    fetchMore({
      variables: {
        page: currentPage,
      },
    });
  };

  const renderArticles = () => {
    if (data) {
      return <Table data={data} />;
    }
  };

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else {
    return (
      <Form handleLoadMore={handleLoadMore} renderArticles={renderArticles} />
    );
  }
}

export default App;
