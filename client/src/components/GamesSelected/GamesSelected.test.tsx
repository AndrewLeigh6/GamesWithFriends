import React from "react";
import { render } from "@testing-library/react";
import GamesSelected from "./GamesSelected";

it("renders game selected correctly with props", () => {
  const component = <GamesSelected gamesSelected={0} />;

  const { getByText, getByRole } = render(component);

  getByText(/0\/3/i);
  getByText(/selected/i);
  getByRole("button", { name: /done/i });
});
