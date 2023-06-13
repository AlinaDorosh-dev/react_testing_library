import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
import Options from "../Options";

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
