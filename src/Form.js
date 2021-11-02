import React, { useState } from "react";
import { Flex, Center, Input, Text, Stack, Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { CREATE_ARTICLE } from "./mutations/articles";
import { GET_ARTICLES } from "./queries/articles";

const Form = ({ renderArticles, handleLoadMore }) => {
  const [title, setArticleTitle] = useState(null);
  const [url, setArticleURL] = useState(null);
  const [language, setArticleLanguage] = useState(null);

  const [addArticle] = useMutation(CREATE_ARTICLE, {
    refetchQueries: GET_ARTICLES,
  });

  const createNewArticle = () => {
    addArticle({
      variables: { title, url, language },
    });
  };

  return (
    <Flex w="100%" flexDir="column" justifyItems="center">
      <Center>
        <Text fontSize="4xl">Create a new article</Text>
      </Center>
      <Stack spacing={4}>
        <Input
          aria-label="article-title"
          placeholder="Article Title"
          onInput={(e) => setArticleTitle(e.target.value)}
        />
        <Input
          placeholder="Article url"
          onInput={(e) => setArticleURL(e.target.value)}
        />
        <Input
          placeholder="Article Language"
          onInput={(e) => setArticleLanguage(e.target.value)}
        />

        <Button
          aria-label="new-article"
          colorScheme="blue"
          onClick={createNewArticle}
        >
          Create article
        </Button>
      </Stack>
      <Center>
        <Text fontSize="4xl">Current articles</Text>
      </Center>
      {renderArticles()}

      <Button colorScheme="blue" onClick={handleLoadMore}>
        Fetch more
      </Button>
    </Flex>
  );
};

export default Form;
