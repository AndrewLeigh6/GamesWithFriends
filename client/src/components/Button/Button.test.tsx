import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

it("renders button correctly with props", () => {
  const component = <Button color="Primary">Select</Button>;

  const { getByRole } = render(component);

  getByRole("button", { name: /select/i });
});
