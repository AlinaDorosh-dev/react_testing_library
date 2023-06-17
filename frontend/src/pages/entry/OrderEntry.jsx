import Options from "./Options";
import TotalOrder from "./TotalOrder";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <TotalOrder />
      <Button
        disabled={!totals.scoops || totals.scoops < 0}
        variant={!totals.scoops || totals.scoops < 0 ? "secondary" : "primary"}
        type='submit'
        onClick={() => setOrderPhase(2)}
      >
        Order Sundae!
      </Button>
    </div>
  );
}
