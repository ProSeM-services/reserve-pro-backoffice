import { MemberAvatar } from "@/components/common/members/member-avatar";
import { Label } from "@/components/ui/label";
import { IAppointment } from "@/interfaces/appointments.interface";
import CompanyDetailCell from "@/pages/appointments/components/table/company-detail-cell";
import { AppointmentsTableActions } from "@/pages/appointments/components/table/appointmnet-cell-actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FromatedDate } from "@/lib/format-date";
import { Calendar, Clock, Mail, Phone } from "lucide-react";
export function AppointmnetCard({
  appointment,
}: {
  appointment: IAppointment;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          key={appointment.id}
          className={` ${
            appointment.confirmed
              ? "bg-green-300"
              : appointment.canceled
              ? "bg-red-400 text-white"
              : "bg-sky-100"
          }   text-[14px]   rounded p-2 shadow transition-all cursor-pointer relative space-y-1 `}
        >
          <p className="block font-bold   truncate">{appointment.fullName}</p>
          <div>
            {appointment.companyId && (
              <CompanyDetailCell companyId={appointment.companyId} />
            )}
          </div>

          <p className=" truncate text">{appointment.time} hs</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <AppointmnetDetailsPopover appointment={appointment} />
      </PopoverContent>
    </Popover>
  );
}

function AppointmnetDetailsPopover({
  appointment,
}: {
  appointment: IAppointment;
}) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>{appointment.fullName}</CardTitle>

        <CardDescription>
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <FromatedDate date={appointment.date} />
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            {appointment.time} hs
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4" />
            {appointment.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4" />
            {appointment.phone}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {appointment.companyId && (
            <CompanyDetailCell companyId={appointment.companyId} />
          )}
        </div>
        <div className="text-xs ">
          {appointment.User && (
            <div className="h-10 flex items-center gap-2  ">
              <MemberAvatar member={appointment.User} size="xs" />
              <div className="flex flex-col ">
                <Label className="text-xs">{appointment.User.fullName}</Label>
              </div>
            </div>
          )}
          <div className="absolute top-0 right-0 mt-6 mr-4 ">
            <AppointmentsTableActions appointment={appointment} />
          </div>

          <br />

          <div>
            <p>
              Turno creado{" "}
              <span>
                <FromatedDate date={appointment.createdAt} />
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
