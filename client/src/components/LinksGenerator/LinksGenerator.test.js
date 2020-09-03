import React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import Links from "../../containers/Links/Links";

it("renders a link input for player 1", () => {
  const { getByLabelText, getByPlaceholderText } = render(<Links />);
  getByLabelText(/player 1/i);
  getByPlaceholderText("https://steamcommunity.com/id/your-steam-profile/");
});

it("renders 2 link inputs for friends", () => {
  const { getByLabelText } = render(<Links />);
  getByLabelText(/player 2/i);
  getByLabelText(/player 3/i);
});

it("renders a link input for player 4 when add friend is clicked", () => {
  const { getByLabelText, queryByLabelText, getByText } = render(<Links />);
  expect(queryByLabelText("Player 4")).toBeNull();
  const button = getByText(/add friend/i);
  user.click(button);
  getByLabelText(/player 4/i);
});

it("removes the link input for player 3 when remove friend is clicked", () => {
  const { getByLabelText, queryByLabelText, getByText } = render(<Links />);
  getByLabelText(/player 3/i);
  const button = getByText(/remove friend/i);
  user.click(button);
  expect(queryByLabelText(/player 3/i)).toBeNull();
});

it("prevents the number of friends from being below 1", () => {
  const { getByLabelText, queryByLabelText, getByText } = render(<Links />);

  // make sure we've got our initial 3 inputs
  getByLabelText(/player 1/i);
  getByLabelText(/player 2/i);
  getByLabelText(/player 3/i);

  // remove one - we should now have 2 (user and 1 friend)
  const button = getByText(/remove friend/i);
  user.click(button);
  getByLabelText(/player 1/i);
  getByLabelText(/player 2/i);
  expect(queryByLabelText(/player 3/i)).toBeNull();

  // remove another - we shouldn't go below 2
  user.click(button);
  getByLabelText(/player 1/i);
  getByLabelText(/player 2/i);
});
