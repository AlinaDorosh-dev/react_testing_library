import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";

import OrderEntry from "../OrderEntry";

//We can isolate test in particular file with test.only or test.skip
//we can run particular test file using file name pattern
test("handles error for scoops and toppings routes", async () => {
  //reset handlers to default, because we want to test error handling
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  //if we render component which expected to have props, we need to pass them in render function, we can use jest.fn() to mock function
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  //we eed to use wait for, because there are two alerts, and without waitFor test starts before finding asynchronously sedond alert and test fails
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disable order button if no scoops ordered", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  const user = userEvent.setup();

  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });

  expect(orderSummaryButton).toBeDisabled();

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(orderSummaryButton).toBeEnabled();

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "0");

  expect(orderSummaryButton).toBeDisabled();
});
