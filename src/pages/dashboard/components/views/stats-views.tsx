import useSession from "@/hooks/useSession";
import { UpcomingAppointments } from "../../components/stats/upcoming-appointments";

import { SalesStats } from "../../components/stats/sales-stats";
import { RevenueCard } from "../stats/revenue-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export function DashboardStats() {
  const { member } = useSession();
  if (!member) return null;
  return (
    <div className=" size-full flex flex-col gap-4  ">
      <div className="max-md:hidden flex  gap-2   text-gray-800 ">
        <RevenueCard type="appointments" />
        <RevenueCard type="customers" />
        <RevenueCard type="sales" />
      </div>
      <div className="md:hidden   mx-auto w-[75%]  ">
        <Carousel className="w-full  ">
          <CarouselContent className="w-full">
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
        <div className="w-1/2">
          <UpcomingAppointments />
        </div>
        <div className="w-[900px]  h-full">
          <SalesStats />
        </div>
      </section>
      <section className="md:hidden flex flex-col gap-2">
        <UpcomingAppointments />
        <div className="w-full  h-full">
          <SalesStats />
        </div>
      </section>
    </div>
  );
}
