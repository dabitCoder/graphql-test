import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import { MockedProvider } from "@apollo/react-testing";
import { GET_ARTICLES } from "./queries/articles";

const defaultMock = [
  {
    request: {
      query: GET_ARTICLES,
    },
    result: {
      data: {
        allArticles: [{ id: 1, title: "Test title", url: "test.url.com" }],
      },
    },
  },
];

describe("App testing", () => {
  const component = (mocks = defaultMock) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const setup = (mocks) => render(component(mocks));

  it("Should match snapshot", async () => {
    const { container } = setup();
    await waitForElementToBeRemoved(screen.getByText("Loading..."));
    expect(container).toMatchSnapshot();
  });

  it("Should render loading", () => {
    setup();
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeDefined();
  });

  it("Should render an input", async () => {
    setup();
    const titleInput = await screen.findByLabelText("article-title");
    expect(titleInput).toBeDefined();
  });
});
