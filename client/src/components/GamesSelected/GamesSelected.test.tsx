import React from "react";
import { render } from "@testing-library/react";
import GamesSelected from "./GamesSelected";
import { BrowserRouter as Router } from "react-router-dom";

it("renders game selected correctly with props", () => {
  const component = (
    <Router>
      <GamesSelected gamesSelected={0} maxVotesAllowed={3} />
    </Router>
  );

  const { getByText, queryByRole } = render(component);

  getByText(/0\/3/i);
  getByText(/selected/i);
  const button = queryByRole("button", { name: /done/i });
  expect(button).not.toBeInTheDocument();
});

it("renders done button when max votes have been reached", () => {
  const component = (
    <Router>
      <GamesSelected gamesSelected={3} maxVotesAllowed={3} />
    </Router>
  );

  const { getByText, getByRole } = render(component);
  getByText(/3\/3/i);
  getByText(/selected/i);

  getByRole("button", { name: /done/i });
});
