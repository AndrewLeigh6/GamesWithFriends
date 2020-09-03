import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

it("renders heading and subheading correctly", () => {
  const { getByText } = render(<Header />);
  const text = getByText(/games with friends/i);
  expect(text).toBeInTheDocument();
});
