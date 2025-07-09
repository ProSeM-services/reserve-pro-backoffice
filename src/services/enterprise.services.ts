import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IApiEnterprise } from "@/interfaces/api/enterprise.interface";
import { IEnterprise } from "@/interfaces/enterprise.interface";

export class EnterpiseServices {
  static async getAll(): Promise<IApiEnterprise[]> {
    const res = await axiosInstance.get(`${BASE_URL}/enterprise`);
    return res.data;
  }
  static async getById(id: string): Promise<IEnterprise> {
    const res = await axiosInstance.get(`${BASE_URL}/enterprise/${id}`);
    return res.data;
  }

  static async create(data: IEnterprise) {
    const res = await axiosInstance.post(`${BASE_URL}/enterprise`, data);
    return res.data;
  }
  static async update(id: string, data: Partial<IEnterprise>) {
    const res = await axiosInstance.patch(`${BASE_URL}/enterprise/${id}`, data);
    return res.data;
  }
}
