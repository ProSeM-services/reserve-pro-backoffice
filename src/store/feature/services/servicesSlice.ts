import { IService } from "@/interfaces";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ServiceState extends IStoreState {
  value: number;
  services: IService[];
  inmutableServices: IService[];
}

const initialState: ServiceState = {
  value: 0,
  services: [],
  inmutableServices: [],
  loading: true,
  fetched: false,
  updated: false,
};

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    toggleServiceLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSerivicesUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.fetched = true;
      state.services = action.payload;
      state.inmutableServices = action.payload;
    },
    addService: (state, action: PayloadAction<IService>) => {
      state.services.push(action.payload);
      state.inmutableServices.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addService,
  setServices,
  toggleServiceLoading,
  setSerivicesUpdated,
} = serviceSlice.actions;

export default serviceSlice.reducer;
