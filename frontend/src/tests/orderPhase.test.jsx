import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  //render app
  const { unmount } = render(<App />);
  const user = userEvent.setup();
  //add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  //find and click order button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

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
  await user.click(tcCheckbox);

  const confirmOrderButton = await screen.findByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  //expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  //confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //expect "loading" to disappear
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  //click new order button on confirmation page

  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  //check that scoops and toppings total have been reset
  const total = screen.getByText("Grand total:$", {
    exact: false,
  });
  expect(total).toHaveTextContent("0.00");
  unmount();
});

test("Toppings header is not on summary page if no toppings ordered", async () => {
  render(<App />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  const scoopsHeading = await screen.findByRole("heading", {
    name: "Scoops: $2.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test("Toppings header is not on summary page if toppings added and then removed", async () => {
  render(<App />);
  const user = userEvent.setup();

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  await user.click(cherriesCheckbox);

  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });

  await user.click(orderSummaryButton);

  const scoopsHeading = await screen.findByRole("heading", {
    name: "Scoops: $4.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  //if element doesn't exist,we use queryBy instead of getBy, which would throw error
  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});

