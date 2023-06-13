import { Container } from "react-bootstrap";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  return (
    <div className='App'>
      <Container>
        <OrderDetailsProvider>
          {/* SummaryForm and OrderEntry need provider to access context */}
          <SummaryForm />
          <OrderEntry />
        </OrderDetailsProvider>
        {/* Confirmation page does not need provider */}
      </Container>
    </div>
  );
}

export default App;
