import Options from "./Options";
import TotalOrder from "./TotalOrder";
import { Button } from "react-bootstrap";

export default function OrderEntry({ setOrderPhase }) {
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <TotalOrder />
      <Button variant='primary' type='link' onClick={() => setOrderPhase(2)}>
        Order Sundae!
      </Button>
    </div>
  );
}
