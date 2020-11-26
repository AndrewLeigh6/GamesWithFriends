import React from "react";
import { render } from "@testing-library/react";
import Feature, { Icon } from "./Feature";

it("renders feature correctly with props", () => {
  const component = <Feature icon={Icon.Coop} feature="Online Co-op" />;

  const { getByText, getByRole } = render(component);

  getByText(/Online Co-op/i);
  getByRole(/img/i);
});
