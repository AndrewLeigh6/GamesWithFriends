import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Links from "./Links";

it("generates 3 links for the user and 2 friends", () => {
  const { getByLabelText, getByText } = render(<Links />);
  const player1 = getByLabelText(/player 1/i);
  const player2 = getByLabelText(/player 2/i);
  const player3 = getByLabelText(/player 3/i);

  user.type(player1, "Andrew");
  user.type(player2, "Alex");
  user.type(player3, "Joey");

  expect(player1).toHaveValue("Andrew");
  expect(player2).toHaveValue("Alex");
  expect(player3).toHaveValue("Joey");

  const button = getByText(/generate links/i);
  //user.click(button);
});
