import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { ICreatePayment, IPayment } from "@/interfaces/payment.interface";

export class PaymentServices {
  static async getPayments(): Promise<IPayment[]> {
    const res = await axiosInstance.get(`${BASE_URL}/payments`);

    return res.data;
  }
  static async createPayment(body: ICreatePayment): Promise<IPayment> {
    const res = await axiosInstance.post(`${BASE_URL}/payments`, body);

    return res.data;
  }
  static async subscribe(body: {
    email: string;
    amount: number;
    frequency: number;
    plan_id: string;
  }): Promise<{ init_point: string }> {
    const res = await axiosInstance.post(
      `${BASE_URL}/payments/subscribe`,
      body
    );

    return res.data;
  }
  static async updatePayment(
    id: string,
    body: Partial<IPayment>
  ): Promise<IPayment[]> {
    const res = await axiosInstance.patch(`${BASE_URL}/payments/${id}`, body);

    return res.data;
  }
}
