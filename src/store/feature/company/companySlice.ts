import { ICompany, IWorkhour } from "@/interfaces";
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
    setCompanies: (
      state,
      action: PayloadAction<{ companies: ICompany[]; fromServer?: boolean }>
    ) => {
      const { companies, fromServer } = action.payload;
      state.fetched = true;
      state.companies = companies;
      if (fromServer) state.inmutablesCompanies = companies;
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
    updateWorkHours: (
          state,
          action: PayloadAction<{ id: string; changes: Partial<IWorkhour> }>
        ) => {
          const { id, changes } = action.payload;
    
          const index = state.companies.findIndex((company) => company.id === id);
    
          if (index !== -1) {
            state.companies[index] = {
              ...state.companies[index],
              ...changes,
            };
    
            const immutableIndex = state.inmutablesCompanies.findIndex(
              (company) => company.id === id
            );
            if (immutableIndex !== -1) {
              state.inmutablesCompanies[immutableIndex] = {
                ...state.inmutablesCompanies[immutableIndex],
                ...changes,
              };
            }
          }
          //     if (state.asideService?.id === id) {
          //   state.asideService = {
          //     ...state.asideService,
          //     ...changes,
          //   };
          // }
        }
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
  updateWorkHours,
} = companySlice.actions;

export default companySlice.reducer;
