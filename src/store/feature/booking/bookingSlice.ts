import { ICompany, IService, IUser } from "@/interfaces";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface IBookinData {
  companyId: string;
  service?: IService;
  duration: string;
  member?: IUser;
  time: string;
  date: string;
}
export interface BookingState extends IStoreState {
  step: number;
  bookingData: IBookinData;
}

const initialState: BookingState = {
  step: 0,
  loading: true,
  fetched: false,
  bookingData: {
    companyId: "",
    service: undefined,
    duration: "",
    member: undefined,
    date: "",
    time: "",
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<"forward" | "back">) => {
      state.step =
        action.payload === "forward" ? state.step + 1 : state.step - 1;
    },
    setBookinData: (
      state,
      action: PayloadAction<{
        key: keyof IBookinData;
        value: string | number | ICompany | IService | IUser;
      }>
    ) => {
      const { key, value } = action.payload;
      state.bookingData = { ...state.bookingData, [key]: value };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStep, setBookinData } = bookingSlice.actions;

export default bookingSlice.reducer;
