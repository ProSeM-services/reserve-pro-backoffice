import { MemberAvatar } from "@/components/common/members/member-avatar";
import { Label } from "@/components/ui/label";
import { FromatedDate } from "@/lib/format-date";
import { useAppSelector } from "@/store/hooks";
import { ServiceCell } from "./service-cell";

export function AppointmentList() {
  const { appointmentsTable } = useAppSelector((s) => s.appointments);
  const { members } = useAppSelector((s) => s.member);

  console.log("appointmentsTable", appointmentsTable);
  return (
    <div className="flex flex-col border rounded-md p-2 flex-wrap   h-full ">
      {appointmentsTable.map((app) => (
        <div
          className=" bg-background   w-full   p-2 rounded-md    space-y-1"
          key={app.id}
        >
          <section className=" flex justify-between">
            <div>
              <Label>
                <FromatedDate date={app.date} />
              </Label>
              <p className="font-medium text-gray-600">{app.time} hs</p>
            </div>

            {app.canceled && (
              <p className="bg-destructive  rounded-md w-24 h-6 text-white flex justify-center items-center">
                cancelado
              </p>
            )}
            {app.confirmed && (
              <p className="bg-green-700  rounded-md w-24 h-6 text-white flex justify-center items-center">
                confirmado
              </p>
            )}
            {!app.confirmed && !app.canceled && (
              <p className="bg-yellow-500  rounded-md w-24 h-6 text-white flex justify-center items-center">
                pendiente
              </p>
            )}
          </section>

          <div className="flex items-center justify-between ">
            <div className="w-1/2">
              {app.UserId && members.filter((s) => s.id === app.UserId)[0] && (
                <div className="h-10 flex items-center gap-1  ">
                  <MemberAvatar
                    member={members.filter((s) => s.id === app.UserId)[0]}
                    size="xs"
                  />
                  <div className="flex flex-col">
                    <Label>
                      {members.filter((s) => s.id === app.UserId)[0].fullName}
                    </Label>
                  </div>
                </div>
              )}
            </div>
            <div className="text-right  ">
              {app.ServiceId && (
                <ServiceCell serviceId={app.ServiceId} icon={false} />
              )}
            </div>
          </div>

          <div className="max-md:hidden flex items-center gap-2 justify-end text-gray-500  text-xs">
            Agendado el
            <FromatedDate date={app.createdAt} />
            <p>{new Date(app.createdAt).toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
