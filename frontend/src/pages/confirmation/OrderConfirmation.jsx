import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const { resetOrder } = useOrderDetails();

  const handleClick = () => {
    resetOrder();
    setOrderPhase(1);
  };
  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {!orderNumber ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1>Thank you!</h1>
          <p>Your order number is {orderNumber}</p>
          <p>as per our terms and conditions, nothing will happen now</p>
          <Button variant='primary' type='link' onClick={() => handleClick()}>
            Create new order
          </Button>
        </div>
      )}
    </div>
  );
}
