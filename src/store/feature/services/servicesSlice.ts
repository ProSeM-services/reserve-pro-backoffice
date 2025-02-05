import { IService } from "@/interfaces";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type AsideType = "add-member" | "details" | "edit";
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
    setServices: (
      state,
      action: PayloadAction<{ services: IService[]; fromServer?: boolean }>
    ) => {
      const { services, fromServer } = action.payload;
      state.fetched = true;
      state.services = services;
      if (fromServer) state.inmutableServices = services;
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
    updateService: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<IService> }>
    ) => {
      const { id, changes } = action.payload;

      // Encuentra el índice del servicio en el array principal
      const index = state.services.findIndex((service) => service.id === id);

      if (index !== -1) {
        // Actualiza el servicio en el array principal
        state.services[index] = {
          ...state.services[index],
          ...changes,
        };

        // Actualiza también los datos en inmutableServices
        const immutableIndex = state.inmutableServices.findIndex(
          (service) => service.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutableServices[immutableIndex] = {
            ...state.inmutableServices[immutableIndex],
            ...changes,
          };
        }
      }

      // Si el servicio que está en el aside se está actualizando, también lo actualiza
      if (state.asideService?.id === id) {
        state.asideService = {
          ...state.asideService,
          ...changes,
        };
      }
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
  updateService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
