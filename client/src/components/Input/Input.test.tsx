import React from "react";
import { render } from "@testing-library/react";
import Input, { LeftIcon, RightIcon } from "./Input";
import userEvent from "@testing-library/user-event";

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

  const button = queryByRole("button", { name: /remove button/i });
  expect(button).not.toBeInTheDocument();
});

it("renders input correctly with right icon props", () => {
  const clicked = jest.fn();

  const component = (
    <Input
      label="Your Steam URL"
      name="user"
      placeholder="Enter your Steam URL"
      leftIcon={LeftIcon.User}
      rightIcon={RightIcon.Times}
      iconClicked={clicked}
    />
  );

  const { getByText, getByRole } = render(component);

  getByText(/your steam url/i);
  getByRole("textbox", { name: /your steam url/i });
  const button = getByRole("button", { name: /remove button/i });

  userEvent.click(button);
  expect(clicked).toHaveBeenCalled();
});

it("renders input correctly with value prop and copy icon", () => {
  const component = (
    <Input
      label="felineyx"
      name="felineyx"
      value="http://localhost:3000/session?q=PrivateChocolateWolverine"
      leftIcon={LeftIcon.User}
      rightIcon={RightIcon.Copy}
      iconClicked={() => null}
    />
  );

  const { getByRole, getByDisplayValue } = render(component);

  getByRole("textbox", { name: /felineyx/i });
  getByRole("button", { name: /copy button/i });
  getByDisplayValue(
    "http://localhost:3000/session?q=PrivateChocolateWolverine"
  );
});
