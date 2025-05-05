import { IUser } from "@/interfaces";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MemberState extends IStoreState {
  value: number;
  members: IUser[];
  memberLogged?: IUser;
  inmutableMembers: IUser[];
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
    setMemberLogged: (state, action: PayloadAction<IUser>) => {
      state.memberLogged = action.payload;
    },
    setMembers: (
      state,
      action: PayloadAction<{ members: IUser[]; fromServer?: boolean }>
    ) => {
      const { members, fromServer } = action.payload;
      state.fetched = true;
      state.members = members;
      if (fromServer) state.inmutableMembers = members;
    },
    addMember: (state, action: PayloadAction<IUser>) => {
      state.members.push(action.payload);
      state.inmutableMembers.push(action.payload);
    },
    setMemberUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
    updateMember: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<IUser> }>
    ) => {
      const { id, changes } = action.payload;

      const index = state.members.findIndex((m) => m.id === id);

      if (index !== -1) {
        state.members[index] = {
          ...state.members[index],
          ...changes,
        };

        const immutableIndex = state.inmutableMembers.findIndex(
          (m) => m.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutableMembers[immutableIndex] = {
            ...state.inmutableMembers[immutableIndex],
            ...changes,
          };
        }
      }
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
  updateMember,
} = memberSlice.actions;

export default memberSlice.reducer;
