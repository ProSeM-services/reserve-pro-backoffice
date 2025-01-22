import { Separator } from "@/components/ui/separator";
import { AppointmentsTable } from "../components/appointments-table";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import useSession from "@/hooks/useSession";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/store/hooks";
import { setAppointmentsFilterDate } from "@/store/feature/appointnments/appointmentsSlice";

export function AppointmentPage() {
  const { member } = useSession();
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col   size-full  space-y-4">
      <header className=" flex max-md:flex-col md:items-center  justify-between ">
        <h2 className="text-xl font-semibold">Turnos</h2>
        <div className="flex max-md:flex-col  gap-4">
          {/*Posible boton para agregar turnos */}
          <div className="flex gap-2">
            <MemberAvatar member={member} size="xs" />
            <div className="flex flex-col">
              <Label>{member.fullName}</Label>
              <span>{member.email}</span>
            </div>
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
