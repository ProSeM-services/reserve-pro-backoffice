import { IEnterprise } from "@/interfaces/enterprise.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerState extends IStoreState {
  enterprise: IEnterprise;
}

const initialState: CustomerState = {
  loading: false,
  fetched: false,
  enterprise: {} as IEnterprise,
};

export const enterpriseSlice = createSlice({
  name: "enterprise",
  initialState,
  reducers: {
    setEnterprise: (state, action: PayloadAction<IEnterprise>) => {
      state.fetched = true;
      state.enterprise = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEnterprise } = enterpriseSlice.actions;

export default enterpriseSlice.reducer;
