import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { ICustomerStat, MonthlyData } from "@/interfaces/stats.interface";

export class StatsServices {
  static async getCustomerStats(
    start?: number,
    end?: number,
    year?: number
  ): Promise<ICustomerStat[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/stats/customers-by-month?start=${start || "09"}&end=${
        end || "11"
      }&year=${year || "2024"}`
    );
    return res.data;
  }

  static async getAppointmentStats(
    start?: number,
    end?: number,
    year?: number
  ): Promise<MonthlyData[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/stats/appointmets-by-month?start=${start || "01"}&end=${
        end || "11"
      }&year=${year || "2024"}`
    );
    return res.data;
  }
}
