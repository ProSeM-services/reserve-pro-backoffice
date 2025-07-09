import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MainState extends IStoreState {
  firstLoad: boolean;
  crossCompanyId?: string;
}

const initialState: MainState = {
  firstLoad: false,
  loading: true,
  fetched: false,
  crossCompanyId: "",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setMainFetched: (state, action: PayloadAction<boolean>) => {
      state.fetched = action.payload;
    },
    setCrossMainCompany: (state, action: PayloadAction<string>) => {
      state.crossCompanyId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMainFetched, setCrossMainCompany } = mainSlice.actions;

export default mainSlice.reducer;
