import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IAddMember, ICreateUser, IUser } from "@/interfaces";
import { IAPIUser } from "@/interfaces/api";

export class MemberServices {
  static async getMembers(): Promise<IUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user`);

    return res.data;
  }
  static async getFree(): Promise<IUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user/free`);

    return res.data;
  }
  static async searchMembers(value: string): Promise<IUser[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/user/search?value=${value}`
    );

    return res.data;
  }
  static async sendInvite(id: string): Promise<IUser> {
    const res = await axiosInstance.post(`${BASE_URL}/user/invite/${id}`);

    return res.data;
  }
  static async getById(id: string): Promise<IUser> {
    const res = await axiosInstance.get(`${BASE_URL}/user/details/${id}`);

    return res.data;
  }
  static async getCount(): Promise<number> {
    const res = await axiosInstance.get(`${BASE_URL}/user/count`);

    return res.data;
  }

  static async createMember(data: ICreateUser): Promise<IAPIUser> {
    const res = await axiosInstance.post(`${BASE_URL}/user`, data);

    return res.data;
  }
  static async addToCompany(data: IAddMember) {
    const res = await axiosInstance.post(
      `${BASE_URL}/user/add-to-company`,
      data
    );

    return res.data;
  }
  static async removeFromCompany(data: IAddMember) {
    const res = await axiosInstance.post(
      `${BASE_URL}/user/remove-from-company`,
      data
    );

    return res.data;
  }
  static async update(id: string, data: Partial<IUser>): Promise<IUser> {
    const res = await axiosInstance.patch(`${BASE_URL}/user/${id}`, data);

    return res.data;
  }
}
