import { useQuery } from "@tanstack/react-query";
import { StatsServices } from "@/services/stats.services";
import { queryKeys } from "./queryKeys";
import { ICustomerStat, MonthlyData } from "@/interfaces/stats.interface";

export function useCustomerStatsQuery(
  params?: { start?: number; end?: number; year?: number; enabled?: boolean }
) {
  return useQuery<ICustomerStat[]>({
    queryKey: queryKeys.stats.customers(
      params?.start,
      params?.end,
      params?.year
    ),
    queryFn: () =>
      StatsServices.getCustomerStats(
        params?.start,
        params?.end,
        params?.year
      ),
    enabled: params?.enabled,
  });
}

export function useAppointmentStatsQuery(
  params?: { start?: number; end?: number; year?: number; enabled?: boolean }
) {
  return useQuery<MonthlyData[]>({
    queryKey: queryKeys.stats.appointments(
      params?.start,
      params?.end,
      params?.year
    ),
    queryFn: () =>
      StatsServices.getAppointmentStats(
        params?.start,
        params?.end,
        params?.year
      ),
    enabled: params?.enabled,
  });
}
