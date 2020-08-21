import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";
import LinksGenerator from "./LinksGenerator";

it("renders a link input for player 1", () => {
  const { getByLabelText, getByPlaceholderText } = render(<LinksGenerator />);
  getByLabelText(/player 1/i);
  getByPlaceholderText("https://steamcommunity.com/id/your-steam-profile/");
});

it("renders 2 link inputs for friends", () => {
  const { getByLabelText } = render(<LinksGenerator />);
  getByLabelText(/player 2/i);
  getByLabelText(/player 3/i);
});

it("renders a link input for player 4 when add friend is clicked", () => {
  const { getByLabelText, queryByLabelText, getByText } = render(
    <LinksGenerator />
  );
  expect(queryByLabelText("Player 4")).toBeNull();
  const button = getByText(/add friend/i);
  user.click(button);
  getByLabelText(/player 4/i);
});

it("removes the link input for player 3 when remove friend is clicked", () => {
  const { getByLabelText, queryByLabelText, getByText } = render(
    <LinksGenerator />
  );
  getByLabelText(/player 3/i);
  const button = getByText(/remove friend/i);
  user.click(button);
  expect(queryByLabelText(/player 3/i)).toBeNull();
});
