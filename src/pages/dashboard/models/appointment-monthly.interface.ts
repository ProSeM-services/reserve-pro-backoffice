export type ServiceCounts = {
  [service: string]: number;
};

export type MonthlyData = {
  month: string;
} & ServiceCounts;
