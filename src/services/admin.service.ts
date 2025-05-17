import { axiosInstance, BASE_URL } from "@/config/axios.config";

export class AdminServices {
  static async getAllAccounts() {
    const res = await axiosInstance.get(`${BASE_URL}/admin/accounts`);
    return res.data;
  }

  static async getAllEnterprises() {
    const res = await axiosInstance.get(`${BASE_URL}/admin/enterprises`);
    return res.data;
  }
  static async getAllUsers() {
    const res = await axiosInstance.get(`${BASE_URL}/admin/users`);
    return res.data;
  }
  static async getAllCompanies() {
    const res = await axiosInstance.get(`${BASE_URL}/admin/companies`);
    return res.data;
  }
  static async getPayments() {
    const res = await axiosInstance.get(`${BASE_URL}/admin/payments`);
    return res.data;
  }
}
