import { UserZod } from "@/interfaces";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SessionState extends IStoreState {
  session?: UserZod;
  accessToken: string;
}

const initialState: SessionState = {
  session: localStorage.getItem("userLogged")
    ? JSON.parse(localStorage.getItem("userLogged") || "")
    : undefined,
  accessToken: localStorage.getItem("accessToken") || "",
  loading: true,
  fetched: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<UserZod>) => {
      state.session = action.payload;
      state.fetched = true;
    },
    setAccesToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSession, setAccesToken } = sessionSlice.actions;

export default sessionSlice.reducer;
