import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";
import LinksGenerator from "./LinksGenerator";

it("renders a link input for player 1", () => {
  const { getByLabelText, getByPlaceholderText } = render(<LinksGenerator />);
  getByLabelText("Player 1 (that's you!)");
  getByPlaceholderText("https://steamcommunity.com/id/your-steam-profile/");
});

it("renders 2 link inputs for friends", () => {
  const { getByLabelText } = render(<LinksGenerator />);
  getByLabelText("Player 2");
  getByLabelText("Player 3");
});

it("renders a link input for player 4 when add friend is clicked", () => {
  const { getByLabelText, queryByLabelText, getByText } = render(
    <LinksGenerator />
  );
  expect(queryByLabelText("Player 4")).toBeNull();
  screen.debug();
  const button = getByText("+ Add another friend");
  user.click(button);
  getByLabelText("Player 4");
  screen.debug();
});
