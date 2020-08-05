import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

it("renders heading and subheading correctly", () => {
  const { getByText } = render(<Header />);
  expect(getByText(/games with friends/i)).toBeInTheDocument();
});
