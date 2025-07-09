import { DashboardCard } from "../dashboard-card";

export function DashboardWe() {
  return (
    <div className="size-full flex flex-wrap gap-5 overflow-auto   ">
      <DashboardCard type="member" />
      <DashboardCard type="company" />
      <DashboardCard type="services" />
    </div>
  );
}
