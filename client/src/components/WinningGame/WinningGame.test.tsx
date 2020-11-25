import React from "react";
import { render } from "@testing-library/react";
import WinningGame from "./WinningGame";

it("renders winning game correctly with props", () => {
  const title = "test title";
  const image = "random image";
  const votes = 3;

  const component = <WinningGame title={title} image={image} votes={votes} />;

  const { getByText } = render(component);

  getByText(/test title/i);
  getByText(/3/i);
  getByText(/votes/i);
});
