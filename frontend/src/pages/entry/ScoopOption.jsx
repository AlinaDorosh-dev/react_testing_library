import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import { useState } from "react";

export default function ScoopOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();

  const [isValid, setIsValid] = useState(true);
  const handleChange = (e) => {
    const inputValue = e.target.value;
    //check if value is integer, not negative, and not more than 10
    const currentValueFloat = parseFloat(inputValue);
    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(valueIsValid);
    if (valueIsValid) {
      updateItemCount(name, parseInt(e.target.value), "scoops");
    } else {
      updateItemCount(name, 0, "scoops");
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      {/*  */}
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs='6' style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: "left" }}>
          <Form.Control
            onChange={(e) => handleChange(e)}
            type='number'
            defaultValue={0}
            isValid={isValid}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
