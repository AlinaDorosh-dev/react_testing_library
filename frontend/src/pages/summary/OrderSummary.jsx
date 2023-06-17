import React from "react";
import { useOrderDetails } from "../../context/OrderDetails";
import SummaryForm from "./SummaryForm";
import { formatCurrency } from "../../utilities";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  //it takes an object and returns an array of arrays
  const scoopsArray = Object.entries(optionCounts.scoops); // [[vanilla, 2], [chocolate, 1]]

  const scoopsList = scoopsArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  //here we dont need entries because we dont need the value, it will be always 1 for each topping
  const toppingsArray = Object.keys(optionCounts.toppings);

  const toppingsList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopsList}</ul>
      {!totals.toppings ? null : (
        <>
          <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingsList}</ul>
        </>
      )}

      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
