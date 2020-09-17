import React from "react";
import { render } from "@testing-library/react";
import Game from "./Game";

it("renders game correctly", () => {
  const info = ["co-op (4)", "local multiplayer"];
  const gameComponent = (
    <Game
      banner="banner.jpg"
      logo="logo.jpg"
      name="fall guys"
      info={info}
      key="key"
    />
  );
  const { getByText, getByAltText } = render(gameComponent);
  getByAltText(/fall guys/i);
  getByText(/co\-op \(4\)/i);
  getByText(/local multiplayer/i);
});
