import React from "react";
import { render } from "@testing-library/react";
import FoundGame from "./FoundGame";

it("renders found game correctly with props", () => {
  const title = "Fall Guys: Ultimate Knockout";
  const image = "random image";
  const icon = "controller";
  const feature = "Online Co-op";

  const component = (
    <FoundGame title={title} image={image} icon={icon} feature={feature} />
  );

  const { getByText } = render(component);

  getByText(/Fall Guys: Ultimate Knockout/i);
  getByText(/Online Co-op/i);
});
