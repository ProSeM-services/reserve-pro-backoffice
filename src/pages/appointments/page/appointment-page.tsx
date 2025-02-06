import { Separator } from "@/components/ui/separator";
import { AppointmentsTable } from "../components/appointments-table";
import { AppointmentList } from "../components/appointment-list";
import { AppointmentsFilter } from "../components/appointments-filter";

export function AppointmentPage() {
  return (
    <div className="flex flex-col   size-full  space-y-4">
      <header className=" flex items-center  justify-between ">
        <h2 className="text-xl font-semibold">Turnos</h2>
        <AppointmentsFilter />
      </header>
      <Separator />
      <section className="flex flex-grow max-h-[90%] h-[90%]  overflow-auto gap-2 max-md:hidden">
        <AppointmentsTable />
      </section>
      <section className="md:hidden">
        <AppointmentList />
      </section>
    </div>
  );
}
