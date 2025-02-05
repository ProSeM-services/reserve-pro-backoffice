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
    setAppointments: (
      state,
      action: PayloadAction<{
        appointments: IAppointment[];
        fromServer?: boolean;
      }>
    ) => {
      const { appointments, fromServer } = action.payload;
      state.fetched = true;
      state.appointments = appointments;
      state.appointmentsTable = appointments;
      if (fromServer) state.inmutablesAppointments = appointments;
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
      state.appointments.unshift(action.payload);
      state.inmutablesAppointments.unshift(action.payload);
      state.appointmentsTable.unshift(action.payload);
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
    editAppointment: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<IAppointment> }>
    ) => {
      const { id, changes } = action.payload;

      // Encuentra el índice del appointment que deseas actualizar
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === id
      );

      if (index !== -1) {
        // Actualiza el appointment en el array principal
        state.appointments[index] = {
          ...state.appointments[index],
          ...changes,
        };

        // Actualiza también los datos en inmutablesAppointments
        const immutableIndex = state.inmutablesAppointments.findIndex(
          (appointment) => appointment.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutablesAppointments[immutableIndex] = {
            ...state.inmutablesAppointments[immutableIndex],
            ...changes,
          };
        }

        // Actualiza también los datos en appointmentsTable
        const tableIndex = state.appointmentsTable.findIndex(
          (appointment) => appointment.id === id
        );
        if (tableIndex !== -1) {
          state.appointmentsTable[tableIndex] = {
            ...state.appointmentsTable[tableIndex],
            ...changes,
          };
        }
      }
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
  editAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
