import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IAPICustomer } from "@/interfaces/api/customer.interface";

export class CustomerServices {
  static async getAll(): Promise<IAPICustomer[]> {
    const res = await axiosInstance.get(`${BASE_URL}/customer`);
    return res.data;
  }

  static async getById(id: string): Promise<IAPICustomer> {
    const res = await axiosInstance.get(`${BASE_URL}/customer/${id}`);
    return res.data;
  }
}
