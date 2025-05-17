import { IEnterprise } from "@/interfaces/enterprise.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerState extends IStoreState {
  enterprise: IEnterprise;
  enterprises: IEnterprise[];
}

const initialState: CustomerState = {
  loading: false,
  fetched: false,
  enterprise: {} as IEnterprise,
  enterprises: [],
};

export const enterpriseSlice = createSlice({
  name: "enterprise",
  initialState,
  reducers: {
    setEnterprise: (state, action: PayloadAction<IEnterprise>) => {
      state.fetched = true;
      state.enterprise = action.payload;
    },
    setEnterprises: (state, action: PayloadAction<IEnterprise[]>) => {
      state.fetched = true;
      state.enterprises = action.payload;
    },
    toggleEnterprisesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEnterprise, toggleEnterprisesLoading, setEnterprises } =
  enterpriseSlice.actions;

export default enterpriseSlice.reducer;
