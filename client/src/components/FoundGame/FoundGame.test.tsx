import React from "react";
import { render } from "@testing-library/react";
import FoundGame from "./FoundGame";

it("renders found game correctly with props", () => {
  const title = "Fall Guys: Ultimate Knockout";
  const image = "random image";
  const categories = [
    {
      id: 1,
      name: "Co-op",
    },
  ];

  const component = (
    <FoundGame
      title={title}
      image={image}
      selected={false}
      features={categories}
      selectedHandler={() => null}
      deselectedHandler={() => null}
    />
  );

  const { getByText, getByRole } = render(component);

  getByRole("img", { name: /fall guys: ultimate knockout/i });
  getByText(/fall guys: ultimate knockout/i);
  getByText(/co-op/i);
  getByRole("button", { name: /select/i });
});
