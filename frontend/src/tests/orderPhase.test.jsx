import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  //    screen.debug()
  //render app
  render(<App />);

  //add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await userEvent.click(cherriesCheckbox);

  //find and click order button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  await userEvent.click(orderSummaryButton);

  //check summary info based on order
  const summaryHeading = await screen.findByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = await screen.findByRole("heading", {
    name: "Scoops: $2.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = await screen.findByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  //accept terms and conditions and click button
  const tcCheckbox = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await userEvent.click(tcCheckbox);

  const confirmOrderButton = await screen.findByRole("button", {
    name: /confirm order/i,
  });
  await userEvent.click(confirmOrderButton);

  //confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //click new order button on confirmation page

  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await userEvent.click(newOrderButton);

  //check that scoops and toppings subtotals have been reset
  const total = screen.getByText("Grand total:$", {
    exact: false,
  });
    expect(total).toHaveTextContent("0.00");
});
