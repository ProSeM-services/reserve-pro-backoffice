import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { INotification } from "@/interfaces/notifications.interface";

export class NotificationServices {
  static async getAllNotifications({
    read,
  }: {
    read?: boolean;
  }): Promise<INotification[]> {
    const res = await axiosInstance.get(`${BASE_URL}/notifications?${read}`);
    return res.data;
  }
}
