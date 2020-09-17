import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

it("renders button correctly with props", () => {
  const { getByText } = render(<Button>Submit</Button>);

  getByText(/submit/i);
});

it("renders form button correctly with props", () => {
  const { getByRole } = render(<Button form>Submit</Button>);

  getByRole("button");
});
