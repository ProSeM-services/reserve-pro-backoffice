import { MemberAvatar } from "@/components/common/members/member-avatar";
import { PaymentCard } from "@/components/common/payment-card";
import { Label } from "@/components/ui/label";
import { IAppointment } from "@/interfaces/appointments.interface";
import CompanyDetailCell from "@/pages/appointments/components/table/company-detail-cell";

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
          ? "bg-green-500"
          : appointment.canceled
          ? "bg-destructive"
          : "bg-gray-600 hover:bg-gray-800 "
      } text-white  text-[14px]   rounded p-2 shadow transition-all cursor-pointer relative`}
    >
      <strong className="block font-bold   truncate">
        {appointment.fullName}
      </strong>
      <span className=" truncate text">{appointment.time} hs</span>
      <div className="text-xs">
        {appointment.User && (
          <div className="h-10 flex items-center gap-2  ">
            <MemberAvatar member={appointment.User} size="xs" />
            <div className="flex flex-col">
              <Label>{appointment.User.fullName}</Label>
            </div>
          </div>
        )}

        {appointment.companyId && (
          <CompanyDetailCell companyId={appointment.companyId} />
        )}
        {appointment.confirmed && appointment.payment_method && (
          <div className="absolute top-1 right-1 ">
            <PaymentCard paymentMethod={appointment.payment_method} size="sm" />
          </div>
        )}
      </div>
    </div>
  );
}
