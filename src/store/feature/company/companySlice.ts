import { ICompany } from "@/interfaces";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CompanyState extends IStoreState {
  value: number;
  companies: ICompany[];
  selectedCompany?: ICompany;
  companyUpdated?: boolean;
  inmutablesCompanies: ICompany[];
}

const initialState: CompanyState = {
  value: 0,
  companies: [],
  inmutablesCompanies: [],
  selectedCompany: undefined,
  loading: true,
  fetched: false,
  companyUpdated: false,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    toggleCompanyLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCompanies: (state, action: PayloadAction<ICompany[]>) => {
      state.fetched = true;
      state.companies = action.payload;
      state.inmutablesCompanies = action.payload;
    },
    addCompany: (state, action: PayloadAction<ICompany>) => {
      state.companies.push(action.payload);
      state.inmutablesCompanies.push(action.payload);
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter((c) => c.id !== action.payload);
      state.inmutablesCompanies = state.inmutablesCompanies.filter(
        (c) => c.id !== action.payload
      );
    },
    setSelectedCompany: (state, action: PayloadAction<ICompany>) => {
      state.selectedCompany = action.payload;
    },
    setCompanyIsUpdated: (state, action: PayloadAction<boolean>) => {
      state.companyUpdated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCompanies,
  addCompany,
  toggleCompanyLoading,
  setSelectedCompany,
  removeCompany,
  setCompanyIsUpdated,
} = companySlice.actions;

export default companySlice.reducer;
