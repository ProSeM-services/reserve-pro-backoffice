import { AppointmentServices } from "@/services/appointment.services";

export const getTodayAppointments = async (userId: string) => {
  const today = new Date();
  return await AppointmentServices.getByUser(userId, today.toISOString());
};
