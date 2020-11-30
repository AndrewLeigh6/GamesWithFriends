import React from "react";
import { render } from "@testing-library/react";
import InputError from "./InputError";

it("renders input correctly with props", () => {
  const component = <InputError message="Error - URL is invalid" />;

  const { getByText } = render(component);
  getByText(/error - url is invalid/i);
});
