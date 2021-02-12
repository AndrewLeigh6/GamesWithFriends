import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenerateLinks from "./GenerateLinks";

it("renders initially with correct input fields", () => {
  const setSession = jest.fn();

  const component = <GenerateLinks setSession={setSession} />;

  const { getByRole, getByText } = render(component);

  getByRole("textbox", { name: /your steam url/i });
  getByRole("textbox", { name: /friend's steam url/i });
  getByText(/how does it work/i);
  getByText(/how do i get my steam url/i);
});

it("adds an input field when 'add friend' button is clicked", () => {
  const setSession = jest.fn();

  const component = <GenerateLinks setSession={setSession} />;

  const { getByRole, getAllByRole } = render(component);

  const button = getByRole("button", { name: /add friend/i });

  let users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(1);

  userEvent.click(button);

  users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(2);
});

it("removes an input field when 'remove friend' button is clicked", () => {
  const setSession = jest.fn();

  const component = <GenerateLinks setSession={setSession} />;

  const { getByRole, getAllByRole } = render(component);

  const addButton = getByRole("button", { name: /add friend/i });
  const removeButton = getByRole("button", { name: /remove button/i });

  let users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(1);

  userEvent.click(addButton);

  users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(2);

  userEvent.click(removeButton);

  users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(1);
});

it("prevents having more than 8 input fields total", () => {
  const setSession = jest.fn();

  const component = <GenerateLinks setSession={setSession} />;

  const { getByRole, getAllByRole } = render(component);

  const button = getByRole("button", { name: /add friend/i });

  let users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(1);

  // tried .click(button, undefined, {clickCount: 7}) here, but no joy
  userEvent.click(button);
  userEvent.dblClick(button);
  userEvent.dblClick(button);
  userEvent.dblClick(button);

  users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(7); // 7 because the host is included in the total

  userEvent.click(button);
  users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(7);
});

it("prevents having fewer than one user", () => {
  const setSession = jest.fn();

  const component = <GenerateLinks setSession={setSession} />;

  const { getByRole, getAllByRole } = render(component);

  const removeButton = getByRole("button", { name: /remove button/i });

  let users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(1);

  userEvent.click(removeButton);
  users = getAllByRole("textbox", { name: /friend's steam url/i });
  expect(users).toHaveLength(1);
});
