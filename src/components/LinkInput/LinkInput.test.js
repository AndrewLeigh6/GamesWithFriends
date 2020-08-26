import React from "react";
import { render } from "@testing-library/react";
import LinkInput from "./LinkInput";

it("renders label and input correctly", () => {
  const { getByLabelText, getByPlaceholderText } = render(
    <LinkInput label="player-1" name="player-1" placeholder="player-1" />
  );

  getByLabelText("player-1");
  getByPlaceholderText("player-1");
});
