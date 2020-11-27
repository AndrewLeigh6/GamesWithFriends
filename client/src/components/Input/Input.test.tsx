import React from "react";
import { render } from "@testing-library/react";
import Input, { LeftIcon, RightIcon } from "./Input";

it("renders input correctly with props", () => {
  const component = (
    <Input
      label="Your Steam URL"
      name="user"
      placeholder="Enter your Steam URL"
      leftIcon={LeftIcon.User}
    />
  );

  const { getByText, getByRole, queryByRole } = render(component);

  getByText(/your steam url/i);
  getByRole("textbox", { name: /your steam url/i });

  const button = queryByRole("button", { name: /remove/i });
  expect(button).not.toBeInTheDocument();
});

it("renders input correctly with right icon", () => {
  const component = (
    <Input
      label="Your Steam URL"
      name="user"
      placeholder="Enter your Steam URL"
      leftIcon={LeftIcon.User}
      rightIcon={RightIcon.Times}
    />
  );

  const { getByText, getByRole } = render(component);

  getByText(/your steam url/i);
  getByRole("textbox", { name: /your steam url/i });
  getByRole("button", { name: /remove/i });
});
