import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MockedProvider } from "@apollo/client/testing/index";

import { GET_ARTICLES } from "./queries/articles";

const mocks = [
  {
    request: {
      query: GET_ARTICLES,
    },
    result: {
      data: {
        allArticles: { id: 1, title: "Test title", url: "test.url.com" },
      },
    },
  },
];

describe("render correctly", () => {
  const component = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const setup = () => render(component);

  it("Should render correctly", () => {
    const div = document.createElement("div");
    ReactDOM.render(div, component);
    ReactDOM.unmountComponentAtNode(div);
  });
});
