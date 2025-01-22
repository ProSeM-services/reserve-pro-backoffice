import { ICustomer } from "@/interfaces/customer.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type AsideType = "details" | "other";
export interface CustomerState extends IStoreState {
  value: number;
  customers: ICustomer[];
  inmutableCustomers: ICustomer[];
  asideCustomer?: ICustomer;
  asideOpen: boolean;
  asideType: AsideType;
}

const initialState: CustomerState = {
  value: 0,
  customers: [],
  inmutableCustomers: [],
  loading: true,
  fetched: false,
  asideType: "details",
  asideCustomer: undefined,
  asideOpen: false,
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
    closeAside: (state) => {
      state.asideOpen = false;
      state.asideCustomer = undefined;
    },
    setAside: (
      state,
      action: PayloadAction<{
        open: boolean;
        type: AsideType;
        customer: ICustomer;
      }>
    ) => {
      console.log("set Aside customers", action);
      state.asideOpen = action.payload.open;
      if (!action.payload.open) {
        state.asideCustomer = undefined;
        return;
      }
      state.asideType = action.payload.type;
      state.asideCustomer = action.payload.customer;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCustomers,
  setCustomers,
  toggleCustomersLoading,
  closeAside,
  setAside,
} = customerSlice.actions;

export default customerSlice.reducer;
