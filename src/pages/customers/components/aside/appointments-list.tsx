import { Label } from "@/components/ui/label";
import { IAppointment } from "@/interfaces/appointments.interface";
import { FromatedDate } from "@/lib/format-date";
import { MemberCard } from "@/pages/members/components/member-card";
import { ServiceCard } from "@/pages/services/components/service-card";
import { useAppSelector } from "@/store/hooks";

export function AppointmentList({
  appointments,
}: {
  appointments: IAppointment[];
}) {
  const { services } = useAppSelector((s) => s.service);
  const { members } = useAppSelector((s) => s.member);
  console.log({ appointments });
  return (
    <div className="flex flex-wrap gap-4  h-full   p-2 ">
      {appointments.map((app) => (
        <div
          className=" bg-background  w-full  p-4 rounded-md border border-border space-y-2"
          key={app.id}
        >
          <section className=" flex justify-between">
            <div>
              <Label>
                <FromatedDate date={app.date} />
              </Label>
              <p className="font-medium text-gray-600">{app.time} hs</p>
            </div>

            <p
              className={`${
                app.canceled ? "bg-destructive" : "bg-green-500 "
              }  rounded-md w-24 h-6 text-white flex justify-center items-center`}
            >
              {app.canceled ? "cancelado" : "activo"}
            </p>
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
              <ServiceCard
                service={services.filter((s) => s.id === app.ServiceId)[0]}
              />
            )}
          </div>

          <div className=" flex items-center gap-2 justify-end text-gray-500  text-sm">
            Turno agendado el
            <FromatedDate date={app.createdAt} />
            <p>{new Date(app.createdAt).toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
