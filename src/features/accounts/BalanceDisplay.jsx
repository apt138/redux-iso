import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils";

function BalanceDisplay() {
  const balance = useSelector((state) => state.account.balance);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
