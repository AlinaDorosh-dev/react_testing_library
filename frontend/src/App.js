import { Container } from "react-bootstrap";
import { useState } from "react";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState(1);
  let Component = OrderEntry;
  switch (orderPhase) {
    case 1:
      Component = OrderEntry;
      break;
    case 2:
      Component = OrderSummary;
      break;
    case 3:
      Component = OrderConfirmation;
      break;
    default:
      break;
  }

  return (
    <div className='App'>
      <Container>
        <OrderDetailsProvider>
          <Component setOrderPhase={setOrderPhase} />
        </OrderDetailsProvider>
      </Container>
    </div>
  );
}

export default App;
