import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useOrderDetails } from "../../context/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [showAlert, setShowAlert] = useState(false); //
  const { resetOrder } = useOrderDetails();

  const handleClick = () => {
    resetOrder();
    setOrderPhase(1);
  };
  useEffect(() => {
    //create an abortController to attach to network request
    const controller = new AbortController();

    axios
      .post("http://localhost:3030/order", { signal: controller.signal })
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((err) => {
        if (err.name !== "CanceledError") setShowAlert(true);
      });
    return () => {
      controller.abort();
    };
  }, [orderNumber]);

  const newOrderButton = (
    <Button onClick={() => handleClick()}>Create new order</Button>
  );

  if (showAlert)
    return (
      <>
        <AlertBanner msg={null} variant={null} />
        {newOrderButton}
      </>
    );

  if (orderNumber) {
    return (
      <div>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p>as per our terms and conditions, nothing will happen now</p>
        {newOrderButton}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
        <p>please wait</p>
      </div>
    );
  }
}
