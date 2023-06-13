import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

//create custom hook to check whether we are in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error("useOrderDetails must be called from provider");
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, //ex. {Chocolate:1, Vanilla:2}
    toppings: {}, //ex. {"Gummy Bears":1}
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    //make a copy of existing state to prevent unwanted mutations
    const newOptionCounts = { ...optionCounts };

    //update copy with new info
    newOptionCounts[optionType][itemName] = newItemCount;
    //ex: optionCounts.scoops.Chocolate = 3

    //set updated state
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  //utility function to derive totatls from optionsCount

  function calculeteTotal(optionType) {
    //get an array of counts ex: [1,2] or []
    const counstArray = Object.values(optionCounts[optionType]);
    //sum the array of items
    const totalCount = counstArray.reduce((acc, curr) => acc + curr, 0);

    //get total price
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculeteTotal("scoops"),
    toppings: calculeteTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
