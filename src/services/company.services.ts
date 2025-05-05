import { axiosInstance, BASE_URL } from "@/config/axios.config";
import {
  IAddMember,
  ICompany,
  ICreateCompany,
  IService,
  IUser,
} from "@/interfaces";

export class CompanyServices {
  static async getCompanies(): Promise<ICompany[]> {
    const res = await axiosInstance.get(`${BASE_URL}/company`);

    return res.data;
  }
  static async getCount(): Promise<number> {
    const res = await axiosInstance.get(`${BASE_URL}/company/count`);

    return res.data;
  }
  static async delete(id: string) {
    return await axiosInstance.delete(`${BASE_URL}/company/${id}`);
  }

  static async getCopanyById(id: string): Promise<ICompany> {
    const res = await axiosInstance.get(`${BASE_URL}/company/${id}`);

    return res.data;
  }
  static async getMembers(id: string): Promise<IUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/company/members/${id}`);

    return res.data;
  }
  static async getServices(id: string): Promise<IService[]> {
    const res = await axiosInstance.get(`${BASE_URL}/company/services/${id}`);

    return res.data;
  }
  static async createcompany(data: ICreateCompany): Promise<ICompany> {
    const res = await axiosInstance.post(`${BASE_URL}/company`, data);

    return res.data;
  }
  static async updateCompany(
    id: string,
    data: Partial<ICompany>
  ): Promise<ICompany> {
    const res = await axiosInstance.patch(`${BASE_URL}/company/${id}`, data);

    return res.data;
  }
  static async addMember(data: IAddMember): Promise<ICompany | undefined> {
    const res = await axiosInstance.post(
      `${BASE_URL}/company/add-member`,
      data
    );

    return res.data;
  }
  static async removeMember(data: IAddMember): Promise<ICompany | undefined> {
    const res = await axiosInstance.post(
      `${BASE_URL}/company/remove-member`,
      data
    );

    return res.data;
  }
}
