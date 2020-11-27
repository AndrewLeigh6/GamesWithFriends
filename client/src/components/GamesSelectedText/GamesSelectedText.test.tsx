import React from "react";
import { render } from "@testing-library/react";
import GamesSelectedText from "./GamesSelectedText";

it("renders game selected text correctly with props", () => {
  const component = <GamesSelectedText gamesSelected={0} />;

  const { getByText } = render(component);

  getByText(/0\/3/i);
  getByText(/selected/i);
});
