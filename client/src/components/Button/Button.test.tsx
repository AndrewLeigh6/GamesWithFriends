import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

it("renders button correctly with props", () => {
  const component = <Button color="Primary">Select</Button>;

  const { getByRole } = render(component);

  getByRole("button", { name: /select/i });
});

it("fires the click event correctly", () => {
  const clicked = jest.fn();
  const component = (
    <Button color="Primary" clicked={clicked}>
      Select
    </Button>
  );
  const { getByText } = render(component);
  const button = getByText("Select");
  expect(clicked).not.toHaveBeenCalled();
  userEvent.click(button);
  expect(clicked).toHaveBeenCalledTimes(1);
});
