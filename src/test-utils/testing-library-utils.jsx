//We import the render to override the render method from testing-library/react in order to wrap the component with the OrderDetailsProvider.

import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetails";

//ui is the component we want to render
//options are the options we want to pass to the render method
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

//re-export everything from testing-library, so we don't have to import everything from testing-library and we can just import from our own file

export * from "@testing-library/react";

//override render method
export { renderWithContext as render };
