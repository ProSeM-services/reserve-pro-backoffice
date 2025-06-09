import { IAppointment } from "@/interfaces/appointments.interface";
import { ICustomerStat, MonthlyData } from "@/interfaces/stats.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDateLimt {
  start: number;
  end: number;
  year: number;
}
export interface StatsState extends IStoreState {
  appointmentStats: MonthlyData[];
  customersStats: ICustomerStat[];
  calenderAppointments: IAppointment[];
  calendarDate: Date;
  dateLimits: IDateLimt;
  INITIAL_DATE_LIMIT: IDateLimt;
}
const INITIAL_DATE_LIMIT: IDateLimt = {
  start: 0,
  end: 11,
  year: new Date().getFullYear(),
};
const initialState: StatsState = {
  loading: true,
  fetched: false,
  calenderAppointments: [],
  appointmentStats: [],
  customersStats: [],
  calendarDate: new Date(),
  INITIAL_DATE_LIMIT,
  dateLimits: INITIAL_DATE_LIMIT,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setAppointmentsStats: (state, action: PayloadAction<MonthlyData[]>) => {
      state.appointmentStats = action.payload;
    },
    setCustomerStats: (state, action: PayloadAction<ICustomerStat[]>) => {
      state.customersStats = action.payload;
    },
    setAppointmentsStatsDateLimits: (
      state,
      action: PayloadAction<{ key: keyof IDateLimt; value: number }>
    ) => {
      const { key, value } = action.payload;
      state.dateLimits = { ...state.dateLimits, [key]: value };
    },
    setINITIAL_DATE_LIMIT: (state, action: PayloadAction<IDateLimt>) => {
      state.INITIAL_DATE_LIMIT = action.payload;
    },
    setCalendarAppointments: (
      state,
      action: PayloadAction<{ appointments: IAppointment[]; date: Date }>
    ) => {
      state.calenderAppointments = action.payload.appointments;
      state.calendarDate = action.payload.date;
    },
  },
});

export const {
  setAppointmentsStats,
  setCustomerStats,
  setCalendarAppointments,
  setAppointmentsStatsDateLimits,
  setINITIAL_DATE_LIMIT,
} = statsSlice.actions;
export default statsSlice.reducer;
