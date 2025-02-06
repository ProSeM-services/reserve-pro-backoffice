import { Separator } from "@/components/ui/separator";
import { AppointmentsTable } from "../components/appointments-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/store/hooks";
import { setAppointmentsFilterDate } from "@/store/feature/appointnments/appointmentsSlice";
import { MemberSelector } from "../components/member-selector";
import { CompanySelector } from "../components/company-selector";

export function AppointmentPage() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col   size-full  space-y-4">
      <header className=" flex max-md:flex-col md:items-center  justify-between ">
        <h2 className="text-xl font-semibold">Turnos</h2>
        <div className="flex max-md:flex-col  gap-4">
          <div className="w-[300px] ">
            <MemberSelector />
          </div>
          <div className="w-[300px] ">
            <CompanySelector />
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger
                value="all"
                onClick={() => dispatch(setAppointmentsFilterDate("all"))}
              >
                Ver Todos los turnos
              </TabsTrigger>
              <TabsTrigger
                value="today"
                onClick={() => dispatch(setAppointmentsFilterDate("today"))}
              >
                Ver turnos de Hoy
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
      <Separator />
      <section className="flex flex-grow max-h-[90%] h-[90%]  overflow-auto gap-2">
        <AppointmentsTable />
      </section>
    </div>
  );
}
