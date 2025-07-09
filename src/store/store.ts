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
import paymentsReducer from "./feature/payments/paymentSlice";
import notificationReducer from "./feature/notifications/notificationsSlice";
import paymentPlansReducer from "./feature/payment-plans/paymentPlanSlice";

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
      payments: paymentsReducer,
      notifications: notificationReducer,
      paymentsPlans: paymentPlansReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
