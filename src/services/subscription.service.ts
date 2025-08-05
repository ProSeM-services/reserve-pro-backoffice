import { axiosInstance, BASE_URL } from "@/config/axios.config";
import {
  ICreateSubscription,
  ISubscription,
} from "@/interfaces/subscription.schema";

export class SubscriptionServices {
  static async getSubscription(enterpriseId: string): Promise<ISubscription> {
    const res = await axiosInstance.get(
      `${BASE_URL}/subscription/${enterpriseId}`
    );
    return res.data;
  }
  static async create(body: ICreateSubscription) {
    const res = await axiosInstance.post(`${BASE_URL}/subscription`, body);
    return res.data;
  }
}
