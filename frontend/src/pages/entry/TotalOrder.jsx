import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities/index";

export default function TotalOrder() {
  const { totals } = useOrderDetails();
  const { total } = totals;
  return <h2>Grand total:{formatCurrency(total)}</h2>;
}
