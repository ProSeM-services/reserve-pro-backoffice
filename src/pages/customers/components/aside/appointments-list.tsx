import { Label } from "@/components/ui/label";
import { IAppointment } from "@/interfaces/appointments.interface";
import { FromatedDate } from "@/lib/format-date";
import { MemberCard } from "@/pages/members/components/member-card";
import { ServiceCard } from "@/pages/services/components/service-card";
import { useAppSelector } from "@/store/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppointmentStatusCell } from "@/pages/appointments/components/table/appointmnet-status";
export function AppointmentList({
  appointments,
}: {
  appointments: IAppointment[];
}) {
  const { services } = useAppSelector((s) => s.service);
  const { members } = useAppSelector((s) => s.member);
  return (
    <div className="flex flex-col gap-4   md:p-2   ">
      {appointments.map((app) => (
        <div
          className=" bg-background t  w-full  p-4 rounded-md border border-border space-y-2"
          key={app.id}
        >
          <section className=" flex justify-between">
            <div>
              <Label>
                <FromatedDate date={app.date} />
              </Label>
              <p className="font-medium text-gray-600">{app.time} hs</p>
            </div>

            <AppointmentStatusCell appointment={app} />
          </section>
          <div className="flex items-center justify-between ">
            {app.UserId && members.filter((s) => s.id === app.UserId)[0] ? (
              <MemberCard
                member={members.filter((s) => s.id === app.UserId)[0]}
                type="read"
              />
            ) : (
              app.UserId
            )}
          </div>

          <div className="">
            {app.ServiceId && services.find((s) => s.id === app.ServiceId) && (
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Detalles del turno</AccordionTrigger>
                  <AccordionContent>
                    <ServiceCard
                      readonly
                      service={
                        services.filter((s) => s.id === app.ServiceId)[0]
                      }
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          <div className=" flex max-md:flex-col md:items-center gap-2 justify-end text-gray-500  text-sm">
            <span>Turno agendado el</span>
            <div className="flex gap-2">
              <FromatedDate date={app.createdAt} />
              <p>{new Date(app.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
