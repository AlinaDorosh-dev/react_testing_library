import { Container } from "react-bootstrap";
import { useState } from "react";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState(1);
  return (
    <div className='App'>
      <Container>
        <OrderDetailsProvider>
          {orderPhase === 1 && <OrderEntry setOrderPhase={setOrderPhase} />}
          {orderPhase === 2 && <OrderSummary setOrderPhase={setOrderPhase} />}
          {orderPhase === 3 && (
            <OrderConfirmation setOrderPhase={setOrderPhase} />
          )}
        </OrderDetailsProvider>
      </Container>
    </div>
  );
}

export default App;
