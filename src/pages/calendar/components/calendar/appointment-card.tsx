import { MemberAvatar } from "@/components/common/members/member-avatar";
import { Label } from "@/components/ui/label";
import { IAppointment } from "@/interfaces/appointments.interface";
import CompanyDetailCell from "@/pages/appointments/components/table/company-detail-cell";
import { ServiceDetail } from "./service-detail";
import { AppointmentsTableActions } from "@/pages/appointments/components/table/appointmnet-cell-actions";

export function AppointmnetCard({
  appointment,
}: {
  appointment: IAppointment;
}) {
  return (
    <div
      key={appointment.id}
      className={` ${
        appointment.confirmed
          ? "bg-green-300"
          : appointment.canceled
          ? "bg-red-400 text-white"
          : "bg-blue-200 text-blue-600 "
      }   text-[14px]   rounded p-2 shadow transition-all cursor-pointer relative space-y-1`}
    >
      <p className="block font-bold   truncate">{appointment.fullName}</p>
      <div>
        {appointment.companyId && (
          <CompanyDetailCell companyId={appointment.companyId} />
        )}
      </div>

      <p className=" truncate text">{appointment.time} hs</p>
      <div className="text-xs ">
        {appointment.User && (
          <div className="h-10 flex items-center gap-2  ">
            <MemberAvatar member={appointment.User} size="xs" />
            <div className="flex flex-col ">
              <Label className="text-xs">{appointment.User.fullName}</Label>
            </div>
          </div>
        )}
        <div className="absolute top-1 right-1 ">
          <AppointmentsTableActions appointment={appointment} />
        </div>
        {appointment.ServiceId && (
          <ServiceDetail serviceId={appointment.ServiceId} />
        )}
      </div>
    </div>
  );
}
