import { Alert } from "react-bootstrap";

export default function AlertBanner({ msg, variant }) {
  const alertMsg = msg || "An unexpected error happened. Please reload the app";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMsg}
    </Alert>
  );
}
