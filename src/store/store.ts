import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./feature/company/companySlice";
import memberReducer from "./feature/members/membersSlice";
import servicesReducer from "./feature/services/servicesSlice";
import customerReducer from "./feature/customers/customerSlice";
import appointmentReducer from "./feature/appointnments/appointmentsSlice";
import statsReducer from "./feature/stats/statsSlices";
import mainReducer from "./feature/main/mainSlice";
import bookingReducer from "./feature/booking/bookingSlice";
import sessionReducer from "./feature/session/sessionSlice";
import enterpriseReducer from "./feature/enterprise/enterpriseSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      company: companyReducer,
      member: memberReducer,
      service: servicesReducer,
      customers: customerReducer,
      appointments: appointmentReducer,
      stats: statsReducer,
      main: mainReducer,
      booking: bookingReducer,
      session: sessionReducer,
      enterprise: enterpriseReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
