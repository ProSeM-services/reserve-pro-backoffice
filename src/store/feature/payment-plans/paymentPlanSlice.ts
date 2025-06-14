import { PaymentPlan } from "@/interfaces/payment-plans.interface";
import { IStoreState } from "@/interfaces/stats.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlaymentState extends IStoreState {
  paymentsPlans: PaymentPlan[];
}

const initialState: PlaymentState = {
  paymentsPlans: [],
  loading: true,
  fetched: false,
  updated: false,
};
export const paymentPlanSlice = createSlice({
  name: "paymentPlans",
  initialState,
  reducers: {
    togglePaymentPlansLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPaymentPlans: (
      state,
      action: PayloadAction<{
        paymentPlans: PaymentPlan[];
        fromServer?: boolean;
      }>
    ) => {
      state.fetched = true;
      state.paymentsPlans = action.payload.paymentPlans;
    },
    addPaymentPlan: (state, action) => {
      state.paymentsPlans.push(action.payload);
    },
    updatePaymentPlan: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.paymentsPlans.findIndex((plan) => plan.id === id);
      if (index !== -1) {
        state.paymentsPlans[index] = {
          ...state.paymentsPlans[index],
          ...changes,
        };
      }
    },
  },
});

export const {
  togglePaymentPlansLoading,
  setPaymentPlans,
  addPaymentPlan,
  updatePaymentPlan,
} = paymentPlanSlice.actions;

export default paymentPlanSlice.reducer;
