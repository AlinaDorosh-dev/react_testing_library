import React, { useState } from "react";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";

const popover = (
  <Popover id='popover-basic'>
    <Popover.Body>No ice cream will actually be delivered</Popover.Body>
  </Popover>
);

export default function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <div>
      <Form>
        <Form.Group controlId='terms-and-conditions'>
          <Form.Check
            type='checkbox'
            checked={tcChecked}
            onChange={(e) => setTcChecked(e.target.checked)}
            label={checkboxLabel}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          disabled={!tcChecked}
          onClick={() => setOrderPhase(3)}
        >
          Confirm order
        </Button>
      </Form>
    </div>
  );
}
