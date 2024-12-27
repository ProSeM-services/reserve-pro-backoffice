import { axiosInstance, BASE_URL } from "@/config/axios.config";
import {
  IAppointment,
  IAppointmentApiResponse,
  ICreateAppointment,
} from "@/interfaces/appointments.interface";

export class AppointmentServices {
  static async getAll(): Promise<IAppointmentApiResponse> {
    const res = await axiosInstance.get(`${BASE_URL}/appointments?limit=30`);
    return res.data;
  }
  static async getAvialablesTimes({
    UserId,
    date,
    duration,
  }: {
    UserId: string;
    date: string;
    duration: string;
  }) {
    const res = await axiosInstance.post(
      `${BASE_URL}/appointments/member-slots`,
      {
        UserId,
        date,
        duration,
      }
    );
    return res.data;
  }
  static async createAppointment(data: ICreateAppointment) {
    return await axiosInstance.post(`${BASE_URL}/appointments`, data);
  }
  static async cancelAppointment(appointmemntId: string) {
    return await axiosInstance.post(`${BASE_URL}/appointments/cancel`, {
      appointmemntId,
    });
  }
  static async getByEmail(id: string): Promise<IAppointment[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/appointments/customer/${id}`
    );
    return res.data;
  }
  static async getByUser(id: string, date?: string): Promise<IAppointment[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/appointments/user/${id}?date=${date}`
    );
    return res.data;
  }
}
