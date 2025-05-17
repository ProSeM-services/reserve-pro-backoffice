import { IPayment } from "@/interfaces/payment.interface";
import { IStoreState } from "@/interfaces/stats.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MemberState extends IStoreState {
  value: number;
  payments: IPayment[];
  inmutablePayments: IPayment[];
}

const initialState: MemberState = {
  value: 0,
  payments: [],
  inmutablePayments: [],
  loading: true,
  fetched: false,
  updated: false,
};

export const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    togglePaymentsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPayments: (
      state,
      action: PayloadAction<{ payments: IPayment[]; fromServer?: boolean }>
    ) => {
      const { payments, fromServer } = action.payload;
      state.fetched = true;
      state.payments = payments;
      if (fromServer) state.inmutablePayments = payments;
    },
    addPayment: (state, action: PayloadAction<IPayment>) => {
      state.payments.push(action.payload);
      state.inmutablePayments.push(action.payload);
    },
    updatePayment: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<IPayment> }>
    ) => {
      const { id, changes } = action.payload;

      const index = state.payments.findIndex((payment) => payment.id === id);

      if (index !== -1) {
        state.payments[index] = {
          ...state.payments[index],
          ...changes,
        };

        const immutableIndex = state.inmutablePayments.findIndex(
          (payment) => payment.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutablePayments[immutableIndex] = {
            ...state.inmutablePayments[immutableIndex],
            ...changes,
          };
        }
      }
    },
  },
});

export const { addPayment, setPayments, togglePaymentsLoading, updatePayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;
