import {} from "@/interfaces";
import { IAppointment } from "@/interfaces/appointments.interface";
import { IMember } from "@/interfaces/member.iterface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type IAppointmentsFilterDate = "today" | "all";
export interface AppointmentState extends IStoreState {
  total: number;
  limit: number;
  offset: number;
  page: number;
  appointments: IAppointment[];
  appointmentsTable: IAppointment[];
  selectedAppointment?: IAppointment;
  inmutablesAppointments: IAppointment[];
  appointmentsFilterDate: IAppointmentsFilterDate;
  selectedMemberForAppointments?: IMember | "all";
}

const initialState: AppointmentState = {
  total: 0,
  limit: 0,
  offset: 0,
  page: 0,
  appointments: [],
  inmutablesAppointments: [],
  appointmentsTable: [],
  selectedAppointment: undefined,
  loading: true,
  fetched: false,
  appointmentsFilterDate: "all",
  selectedMemberForAppointments: "all",
};

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    toggleAppointmentsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAppointments: (state, action: PayloadAction<IAppointment[]>) => {
      state.fetched = true;
      state.appointments = action.payload;
      state.appointmentsTable = action.payload;
      state.inmutablesAppointments = action.payload;
    },
    setAppointmentsTableData: (
      state,
      action: PayloadAction<{
        total: number;
        limit: number;
        offset: number;
        page: number;
      }>
    ) => {
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.offset = action.payload.offset;
      state.page = action.payload.page;
    },
    addAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.appointments.push(action.payload);
      state.inmutablesAppointments.push(action.payload);
      state.appointmentsTable.push(action.payload);
    },
    setSelectedAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.selectedAppointment = action.payload;
    },
    setSelectedMemberForAppointments: (
      state,
      action: PayloadAction<IMember | "all">
    ) => {
      state.selectedMemberForAppointments = action.payload;
      if (action.payload === "all") {
        state.appointmentsTable = state.inmutablesAppointments;
        return;
      }

      const member = action.payload as IMember;

      state.appointmentsTable = state.inmutablesAppointments.filter(
        (e) => e.UserId === member.id
      );
    },
    setAppointmentsFilterDate: (
      state,
      action: PayloadAction<IAppointmentsFilterDate>
    ) => {
      state.appointmentsFilterDate = action.payload;
    },
    cancleAppointment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.appointments.find((e) => e.id === id)) return;
      const appointmnetCanceled = state.appointments.filter(
        (e) => e.id === id
      )[0];

      const newlist = [
        ...state.appointments.filter((e) => e.id !== id),
        { ...appointmnetCanceled, canceled: true },
      ].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      state.appointments = newlist;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAppointment,
  setAppointments,
  toggleAppointmentsLoading,
  setAppointmentsTableData,
  setSelectedAppointment,
  cancleAppointment,
  setAppointmentsFilterDate,
  setSelectedMemberForAppointments,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
