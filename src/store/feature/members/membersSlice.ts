import { IMember } from "@/interfaces/member.iterface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MemberState extends IStoreState {
  value: number;
  members: IMember[];
  memberLogged?: IMember;
  inmutableMembers: IMember[];
}

const initialState: MemberState = {
  value: 0,
  members: [],
  inmutableMembers: [],
  loading: true,
  memberLogged: undefined,
  fetched: false,
  updated: false,
};

export const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    toggleMembersLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMemberLogged: (state, action: PayloadAction<IMember>) => {
      state.memberLogged = action.payload;
    },
    setMembers: (state, action: PayloadAction<IMember[]>) => {
      state.fetched = true;
      state.members = action.payload;
      state.inmutableMembers = action.payload;
    },
    addMember: (state, action: PayloadAction<IMember>) => {
      state.members.push(action.payload);
      state.inmutableMembers.push(action.payload);
    },
    setMemberUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addMember,
  setMembers,
  toggleMembersLoading,
  setMemberLogged,
  setMemberUpdated,
} = memberSlice.actions;

export default memberSlice.reducer;
