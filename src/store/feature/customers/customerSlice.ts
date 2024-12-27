import { ICustomer } from "@/interfaces/customer.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CustomerState extends IStoreState {
  value: number;
  customers: ICustomer[];
  inmutableCustomers: ICustomer[];
}

const initialState: CustomerState = {
  value: 0,
  customers: [],
  inmutableCustomers: [],
  loading: true,
  fetched: false,
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    toggleCustomersLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCustomers: (state, action: PayloadAction<ICustomer[]>) => {
      state.fetched = true;
      state.customers = action.payload;
      state.inmutableCustomers = action.payload;
    },
    addCustomers: (state, action: PayloadAction<ICustomer>) => {
      state.customers.push(action.payload);
      state.inmutableCustomers.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCustomers, setCustomers, toggleCustomersLoading } =
  customerSlice.actions;

export default customerSlice.reducer;
