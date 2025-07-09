import { INotification } from "@/interfaces/notifications.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState extends IStoreState {
  notifications: INotification[];
}

const initialState: NotificationState = {
  loading: false,
  fetched: false,
  notifications: [],
};

export const enterpriseSlice = createSlice({
  name: "enterprise",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.fetched = true;
      state.notifications = action.payload;
    },
    toggleNotificationsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateNotification: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<INotification> }>
    ) => {
      const { id, changes } = action.payload;

      const index = state.notifications.findIndex((m) => m.id === id);

      if (index !== -1) {
        state.notifications[index] = {
          ...state.notifications[index],
          ...changes,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setNotifications,
  toggleNotificationsLoading,
  updateNotification,
} = enterpriseSlice.actions;

export default enterpriseSlice.reducer;
