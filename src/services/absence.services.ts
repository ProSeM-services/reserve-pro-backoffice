import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IAbsence, ICreateAbsence } from "@/interfaces";

export class AbsenceServices {
  static async getByUser(userId: string): Promise<IAbsence[]> {
    const res = await axiosInstance.get(`${BASE_URL}/absences/user/${userId}`);
    return res.data;
  }

  static async getAll(): Promise<IAbsence[]> {
    const res = await axiosInstance.get(`${BASE_URL}/absences`);
    return res.data;
  }

  static async create(data: ICreateAbsence): Promise<IAbsence> {
    const res = await axiosInstance.post(`${BASE_URL}/absences`, data);
    return res.data;
  }

  static async delete(id: string): Promise<void> {
    await axiosInstance.delete(`${BASE_URL}/absences/${id}`);
  }
}
