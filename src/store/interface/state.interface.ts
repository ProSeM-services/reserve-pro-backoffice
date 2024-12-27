export interface IStoreState {
  loading: boolean;
  fetched?: boolean;
  updated?: boolean;
}
export type ServiceCounts = {
  [service: string]: number;
};

export type MonthlyData = {
  month: string;
} & ServiceCounts;

export interface ICustomerStat {
  month: string;
  count: number;
  fill: string;
}
