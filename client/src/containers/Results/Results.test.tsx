import React from "react";
import { render } from "@testing-library/react";
import { Vote } from "../../App";
import Results from "./Results";

const votes: Vote[] = [
  { username: "loke1104", gameIds: [225, 267, 259] },
  { username: "silverstone1294", gameIds: [266, 225, 268] },
];

it("renders correctly with props", () => {
  const component = <Results votes={votes} />;
  const { getByText } = render(component);
  getByText(/fall guys: ultimate knockout/i);
  getByText(/rocket league/i);
  getByText(/terraria/i);
  getByText(/3/i);
  getByText(/2/i);
  getByText(/1/i);
});
