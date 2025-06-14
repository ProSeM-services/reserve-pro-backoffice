import { axiosInstance, BASE_URL } from "@/config/axios.config";
import {
  CreatePaymentPlan,
  PaymentPlan,
} from "@/interfaces/payment-plans.interface";

export class PaymentPlanServices {
  static async getAll(): Promise<PaymentPlan[]> {
    const res = await axiosInstance.get(`${BASE_URL}/payment-plans`);
    return res.data;
  }

  static async create(body: CreatePaymentPlan) {
    const res = await axiosInstance.post(`${BASE_URL}/payment-plans`, body);
    return res.data;
  }
  static async update(id: string, body: Partial<CreatePaymentPlan>) {
    const res = await axiosInstance.patch(
      `${BASE_URL}/payment-plans/${id}`,
      body
    );
    return res.data;
  }
}
