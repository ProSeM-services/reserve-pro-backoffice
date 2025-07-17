import { IStoreState } from "@/interfaces/stats.interface";
import { ISubscription } from "@/interfaces/subscription.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubscriptionState extends IStoreState {
  currentSubscription?: ISubscription;
}

const initialState: SubscriptionState = {
  currentSubscription: undefined,
  loading: false,
  fetched: false,
  updated: false,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setCurrentSubscription: (state, action: PayloadAction<ISubscription>) => {
      state.currentSubscription = action.payload;
      state.fetched = true;
    },
  },
});

export const { setCurrentSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
