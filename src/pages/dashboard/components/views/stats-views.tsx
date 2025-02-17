import useSession from "@/hooks/useSession";
import { AppointmentStats } from "../../components/stats/appointment-stats";

import { SalesStats } from "../../components/stats/sales-stats";
import { RevenueCard } from "../stats/revenue-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AppointmentList } from "@/pages/appointments/components/appointment-list";
export function DashboardStats() {
  const { member } = useSession();
  return (
    <div className=" size-full flex flex-col gap-4  ">
      <div className="flex gap-2   text-gray-800 max-md:hidden">
        <RevenueCard type="appointments" />
        <RevenueCard type="customers" />
        <RevenueCard type="sales" />
      </div>
      <div className="md:hidden   w-[300px] mx-auto ">
        <Carousel className="mx-auto ">
          <CarouselContent>
            <CarouselItem>
              <RevenueCard type="appointments" />
            </CarouselItem>
            <CarouselItem>
              <RevenueCard type="customers" />
            </CarouselItem>
            <CarouselItem>
              <RevenueCard type="sales" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <section className="flex gap-4  h-full flex-grow  max-md:hidden">
        {member.role !== "BASIC" ? (
          <AppointmentStats />
        ) : (
          <div className="w-1/2">
            <AppointmentList />
          </div>
        )}

        <div className="w-[900px]  h-full">
          <SalesStats />
        </div>
      </section>
      <section className="md:hidden flex flex-col gap-2">
        {member.role !== "BASIC" && <AppointmentStats />}
        <div className="w-full  h-full">
          <SalesStats />
        </div>
      </section>
    </div>
  );
}
