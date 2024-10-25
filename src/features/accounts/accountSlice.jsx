import { createSlice } from "@reduxjs/toolkit";
// INITIAL STATE
const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loanPurpose = action.payload.purpose;
        state.loan = action.payload.amount;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

// export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// using deposit in redux classic way. for redux toolkit appraoch, we need
//  to use createAsyncThunkFunction.
//  will explore later

export function deposit(amount, currency) {
  const state = { type: "account/deposit", payload: amount };
  if (currency === "USD") return state;

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertCurrency" });
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&base=${currency}&symbols=USD`
    );
    const data = await response.json();
    console.log(data);
    dispatch({ ...state, payload: data.rates.USD });
  };
}

export default accountSlice.reducer;

// // REDUCER
// export default function accountReducer(state = initialAccountState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         balance: state.balance + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };

//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//         loanPurpose: "",
//       };

//     case "account/convertCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }
// // ACTION CREATORS

// export function deposit(amount, currency) {
//   const state = { type: "account/deposit", payload: amount };
//   if (currency === "USD") return state;

//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertCurrency" });
//     const response = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&base=${currency}&symbols=USD`
//     );
//     const data = await response.json();
//     console.log(data);
//     dispatch({ ...state, payload: data.rates.USD });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
