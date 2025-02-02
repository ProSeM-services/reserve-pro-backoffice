import { AppointmentStats } from "../../components/stats/appointment-stats";

import { SalesStats } from "../../components/stats/sales-stats";
import { RevenueCard } from "../stats/revenue-card";
export function DashboardStats() {
  return (
    <div className=" size-full flex flex-col gap-4 ">
      <div className="flex gap-2   text-gray-800">
        <RevenueCard type="appointments" />
        <RevenueCard type="customers" />
        <RevenueCard type="sales" />
      </div>
      <section className="flex gap-4  h-full">
        <AppointmentStats />
        <div className="w-[900px]  h-full">
          <SalesStats />
        </div>
      </section>
    </div>
  );
}
