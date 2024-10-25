import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanPurpose, setLoanPurpose] = useState("");
  const { loan: toPay, isLoading } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount, currency));
    // dispatch(deposit(depositAmount));
    setDepositAmount(0);
  }

  function handleWithdraw() {
    if (!withdrawAmount) return;
    dispatch(withdraw(withdrawAmount));
    setWithdrawAmount(0);
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount(0);
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label htmlFor="deposit-amount">Deposit</label>
          <input
            type="number"
            id="deposit-amount"
            value={depositAmount}
            onChange={(e) =>
              Number(e.target.value) && setDepositAmount(Number(e.target.value))
            }
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euror</option>
            <option value="GBP">British Pound</option>
          </select>
          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting currency..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label htmlFor="withdraw-amount">Withdraw</label>
          <input
            type="number"
            id="withdraw-amount"
            value={withdrawAmount}
            onChange={(e) =>
              Number(e.target.value) &&
              setWithdrawAmount(Number(e.target.value))
            }
          />
          <button onClick={handleWithdraw}>Withdraw {withdrawAmount}</button>
        </div>

        <div>
          <label htmlFor="loan-amount">Request Loan</label>
          <input
            type="number"
            placeholder="100"
            value={loanAmount}
            onChange={(e) =>
              Number(e.target.value) && setLoanAmount(Number(e.target.value))
            }
          />
          <input
            type="text"
            placeholder="education"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
          />
          <button onClick={handleRequestLoan}>Request Loan</button>
        </div>

        {toPay > 0 && (
          <div>
            <span>Pay back ${toPay}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
