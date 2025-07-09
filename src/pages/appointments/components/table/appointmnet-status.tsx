import { IAppointment } from "@/interfaces/appointments.interface";
import { CalendarCheck, CalendarX } from "lucide-react";

interface AppointmentStatusComponentProps {
  statuts: "canceled" | "confirmed" | "pending";
}
export function AppointmentStatusComponent({
  statuts,
}: AppointmentStatusComponentProps) {
  const canceled = statuts === "canceled";
  const confirmed = statuts === "confirmed";

  return (
    <div>
      <p
        className={`${
          canceled
            ? "bg-red-200 text-red-600"
            : confirmed
            ? "bg-green-200 text-green-600 "
            : "bg-yellow-200 text-yellow-600 "
        } font-light  rounded-full mx-auto size-6  flex justify-center items-center`}
      >
        {canceled ? (
          <CalendarX className="size-3" />
        ) : (
          <div>
            <CalendarCheck className="size-3" />
          </div>
        )}
      </p>
    </div>
  );
}
interface AppointmentsTableActionsProps {
  appointment: IAppointment;
}
export function AppointmentStatusCell({
  appointment,
}: AppointmentsTableActionsProps) {
  const { confirmed, canceled } = appointment;

  return (
    <div>
      <p
        className={`${
          canceled
            ? "bg-red-200 text-red-600"
            : confirmed
            ? "bg-green-200 text-green-600 "
            : "bg-yellow-200 text-yellow-600 "
        } font-light  rounded-full mx-auto size-6  flex justify-center items-center`}
      >
        {canceled ? (
          <CalendarX className="size-3" />
        ) : (
          <div>
            <CalendarCheck className="size-3" />
          </div>
        )}
      </p>
    </div>
  );
}
