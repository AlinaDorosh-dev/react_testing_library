import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("input has class of invalid when user enters invalid value", async () => {
  render(<ScoopOption />);

  const user = userEvent.setup();
  //we dont pass the name of the input because it is changing depending on the option
  const input = await screen.findByRole("spinbutton");
  await user.clear(input);
  await user.type(input, "-1");
  expect(input).toHaveClass("is-invalid");
  await user.clear(input);
  await user.type(input, "2.5");
  expect(input).toHaveClass("is-invalid");
  await user.clear(input);
  await user.type(input, "11");
  expect(input).toHaveClass("is-invalid");
  
  //check if the input change to valid when the user enter a valid value
  await user.clear(input);
  await user.type(input, "3");
  expect(input).not.toHaveClass("is-invalid");
});
