import React from "react";
import { render } from "@testing-library/react";
import WaitingBubble from "./WaitingBubble";

it("renders waiting bubble correctly with props", () => {
  const component = <WaitingBubble name="Loke" selected={2} />;

  const { getByText } = render(component);

  getByText(/loke/i);
  getByText(/2\/3/i);
});
