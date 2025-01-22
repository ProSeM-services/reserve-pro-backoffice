import { Separator } from "@/components/ui/separator";
import { AppointmentsTable } from "../components/appointments-table";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import useSession from "@/hooks/useSession";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AppointmentPage() {
  const { member } = useSession();
  return (
    <div className="flex flex-col   size-full  space-y-4">
      <header className=" flex items-center  justify-between ">
        <h2 className="text-xl font-semibold">Turnos</h2>
        <div className="flex  gap-4">
          {/*Posible boton para agregar turnos */}
          <div className="flex gap-2">
            <MemberAvatar member={member} size="xs" />
            <div className="flex flex-col">
              <Label>{member.fullName}</Label>
              <span>{member.email}</span>
            </div>
          </div>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Ver Turnso de Hoy</TabsTrigger>
              <TabsTrigger value="password">Ver Todos los turnos</TabsTrigger>
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
