import React from "react";
import { render } from "@testing-library/react";
import FoundGame from "./FoundGame";
import { Icon } from "./Feature/Feature";

it("renders found game correctly with props", () => {
  const title = "Fall Guys: Ultimate Knockout";
  const image = "random image";
  const feature = "Online Co-op";

  const component = (
    <FoundGame
      title={title}
      image={image}
      icon={Icon.Controller}
      feature={feature}
      buttonText="Select"
    />
  );

  const { getByText, getByRole } = render(component);

  getByRole("img", { name: /fall guys: ultimate knockout/i });
  getByText(/fall guys: ultimate knockout/i);
  getByText(/online co-op/i);
  getByRole("button", { name: /select/i });
});
