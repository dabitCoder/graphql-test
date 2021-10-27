import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  Flex,
  Center,
  Spinner,
  Input,
  Text,
  Stack,
  Button,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import { CREATE_ARTICLE } from "./mutations/articles";
import { GET_ARTICLES } from "./queries/articles";

function App() {
  const [addArticle] = useMutation(CREATE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLES }],
  });
  const { loading, data } = useQuery(GET_ARTICLES);

  const [title, setArticleTitle] = useState(null);
  const [url, setArticleURL] = useState(null);
  const [language, setArticleLanguage] = useState(null);

  const createNewArticle = () => {
    addArticle({
      variables: { title, url, language },
    });
  };

  const renderArticles = () => {
    if (data) {
      return (
        <Table>
          <Thead>
            <Tr>
              <Th>Article title</Th>
              <Th>Article url</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.allArticles.map((article) => (
              <Tr key={article.id}>
                <Td>{article.title}</Td>
                <Td>{article.url}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
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
      <Flex w="100%" flexDir="column" justifyItems="center">
        <Center>
          <Text fontSize="4xl">Create a new article</Text>
        </Center>
        <Stack spacing={4}>
          <Input
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

          <Button colorScheme="blue" onClick={createNewArticle}>
            Create new article
          </Button>
        </Stack>
        <Center>
          <Text fontSize="4xl">Current articles</Text>
        </Center>
        {renderArticles()}
      </Flex>
    );
  }
}

export default App;
