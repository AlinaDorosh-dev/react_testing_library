import { render, screen, logRoles, fireEvent } from "@testing-library/react";

import App from "./App";

test("correct initial color of the button and updates the state after clicking", () => {
  // render the component and destructure the container
  const { container } = render(<App />);

  //get all the roles in the container
  logRoles(container);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  // click the button
  //we can have multiple assertions in a single test case or divide them into multiple test cases
  fireEvent.click(colorButton);

  //expect color button turn blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  //
  expect(colorButton).toHaveTextContent("Change to red");
});

//This would be if we do separate tests for each case
test("correct initial text of the button", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
});

test("button turns blue when clicked", () => {});

test("initial conditions", () => {
  render(<App />);
  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");

  //to negate the assertion we add ".not"
  expect(checkbox).not.toBeChecked();
});

//Test disabling button with checkbox

test("disable button with checkbox, turn button color to gray", () => {
  render(<App />);
  const colorButton = screen.getByRole("button");
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(colorButton).not.toBeEnabled();
  //expect(colorButton).toBeDisabled(); -the same output
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
});
