import { IService } from "@/interfaces";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type AsideType = "add-member" | "details";
export interface ServiceState extends IStoreState {
  value: number;
  services: IService[];
  inmutableServices: IService[];
  asideService?: IService;
  asideOpen: boolean;
  asideType: AsideType;
}

const initialState: ServiceState = {
  value: 0,
  services: [],
  asideOpen: false,
  inmutableServices: [],
  asideType: "details",
  asideService: undefined,
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
    closeAside: (state) => {
      state.asideOpen = false;
      state.asideService = undefined;
    },
    setAside: (
      state,
      action: PayloadAction<{
        open: boolean;
        type: AsideType;
        service: IService;
      }>
    ) => {
      state.asideOpen = action.payload.open;
      if (!action.payload.open) {
        state.asideService = undefined;
        return;
      }
      state.asideType = action.payload.type;
      state.asideService = action.payload.service;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addService,
  setServices,
  toggleServiceLoading,
  setSerivicesUpdated,
  setAside,
  closeAside,
} = serviceSlice.actions;

export default serviceSlice.reducer;
