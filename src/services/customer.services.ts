import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { ICustomer } from "@/interfaces/customer.interface";

export class CustomerServices {
  static async getAll(): Promise<ICustomer[]> {
    const res = await axiosInstance.get(`${BASE_URL}/customer`);
    return res.data;
  }

  static async getById(id: string): Promise<ICustomer> {
    const res = await axiosInstance.get(`${BASE_URL}/customer/${id}`);
    return res.data;
  }
}
