import React from "react";
import { render } from "@testing-library/react";
import InfoText from "./InfoText";

it("renders info box correctly with props", () => {
  const title = "Test title";
  const body = "Test body";

  const component = <InfoText title={title}>{body}</InfoText>;

  const { getByText } = render(component);

  getByText(/test title/i);
  getByText(/test body/i);
});
