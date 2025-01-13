import { DashboardCard } from "../components/dashboard-card";

export function DashboardPage() {
  return (
    <div className="size-full flex flex-wrap gap-5 overflow-auto  ">
      <DashboardCard type="member" />
      <DashboardCard type="company" />
      <DashboardCard type="services" />
      <DashboardCard type="appointments" />
    </div>
  );
}