import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  const optionItems = items.map((item) => {
    const { name, imagePath } = item;
    return <ItemComponent key={name} name={name} imagePath={imagePath} />;
  });
  return <Row>{optionItems}</Row>;
}
