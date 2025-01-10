import { IAPIAppointment } from "@/interfaces/api/appointments.interface";
import { IAppointment } from "@/interfaces/appointments.interface";
import { memberAdpater } from "./members.adapter";

export function appointmentAdapter(appointment: IAPIAppointment): IAppointment {
  const adaptedMember = memberAdpater(appointment.User);
  return {
    createdAt: appointment.createdAt,
    date: appointment.date,
    email: appointment.email,
    id: appointment.id,
    lastName: appointment.lastName,
    name: appointment.name,
    phone: appointment.phone,
    ServiceId: appointment.ServiceId,
    time: appointment.time,
    User: adaptedMember,
    UserId: appointment.UserId,
    canceled: appointment.canceled,
    companyId: appointment.companyId,
    CustomerId: appointment.CustomerId,
    duration: appointment.duration,
    tenantName: appointment.tenantName,
    fullName: `${appointment.name} ${appointment.lastName}`,
  };
}
export function appointmentListAdpater(
  appointments: IAPIAppointment[]
): IAppointment[] {
  return appointments.map((data) => appointmentAdapter(data));
}
