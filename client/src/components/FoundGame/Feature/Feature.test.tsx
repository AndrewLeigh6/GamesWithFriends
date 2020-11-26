import React from "react";
import { render } from "@testing-library/react";
import Feature, { Icon } from "./Feature";

it("renders feature correctly with props", () => {
  const component = <Feature icon={Icon.Coop} feature="Online Co-op" />;

  const { getByText } = render(component);

  getByText(/online co-op/i);
});
