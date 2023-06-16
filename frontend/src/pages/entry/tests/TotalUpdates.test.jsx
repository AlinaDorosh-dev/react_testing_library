import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();

  //We need to wrap the component with the OrderDetailsProvider
  //here is an example how to do it with render method from testing-library/react. But we can also do it with render method from our own file, so we dont need to add wrapper to every test

  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

  //Initial total equal to 0$
  //exact:false finding partial coincidence
  const scoopSubtotal = screen.getByText("Scoops total:$", { exact: false });

  expect(scoopSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  //All user events are async
  //We clear input before running test
  await user.clear(vanillaInput);

  //Even if it is numerical input we pass second arg as a string
  await user.type(vanillaInput, "1");

  //We expect subtotal to be 2$ as the price is 2$ per scoop
  expect(scoopSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);

  await user.type(chocolateInput, "2");

  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType='toppings' />, { wrapper: OrderDetailsProvider });
  const user = userEvent.setup();

  const cherryToppingCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  //This time no need to await, because data has been alredy loaded, so we use get instead of find
  const hotFudgeToppingCheckbox = screen.getByRole("checkbox", {
    name: "Hot fudge",
  });

  const mmsToppingCheckbox = screen.getByRole("checkbox", {
    name: "M&Ms",
  });

  const toppingsSubtotal = screen.getByText("Toppings total:$", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  expect(cherryToppingCheckbox).not.toBeChecked();
  expect(hotFudgeToppingCheckbox).not.toBeChecked();
  expect(mmsToppingCheckbox).not.toBeChecked();

  await user.click(cherryToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  await user.click(hotFudgeToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  await user.click(mmsToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("4.50");

  await user.click(cherryToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
});

describe("grand total", () => {
  test("total starts at 0", () => {
    const { unmount } = render(<OrderEntry />, {
      wrapper: OrderDetailsProvider,
    });
    const total = screen.getByRole("heading", {
      name: /Grand total:\$/,
    });
    expect(total).toHaveTextContent("0.00");
    
    //unmount the component and abort network call
    unmount();
  });

  test("total updates when we add scoop first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    // const total = screen.getByText("Grand total:$", {
    //   exact: false,
    // });
    const total = screen.getByRole("heading", {
      name: /Grand total:\$/,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    const mmsToppingCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "2");
    expect(total).toHaveTextContent("4.00");
    expect(mmsToppingCheckbox).not.toBeChecked();
    await user.click(mmsToppingCheckbox);
    expect(total).toHaveTextContent("5.50");
  });

  test("total updates when we add topping first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const total = screen.getByRole("heading", {
      name: /Grand total:\$/,
    });

    const cherryToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherryToppingCheckbox).not.toBeChecked();
    await user.click(cherryToppingCheckbox);

    expect(total).toHaveTextContent("1.50");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(chocolateInput);

    await user.type(chocolateInput, "3");

    expect(total).toHaveTextContent("7.50");
  });

  test("total updates properly when item removed", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const total = screen.getByText("Grand total:$", {
      exact: false,
    });

    const cherryToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    //not necesary to make asertion as the same is done in previous test
    // expect(cherryToppingCheckbox).not.toBeChecked();
    await user.click(cherryToppingCheckbox);

    // expect(total).toHaveTextContent("1.50");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(chocolateInput);

    await user.type(chocolateInput, "3");

    // expect(total).toHaveTextContent("7.50");

    await user.type(chocolateInput, "1");
    expect(total).toHaveTextContent("3.50");
  });
});
