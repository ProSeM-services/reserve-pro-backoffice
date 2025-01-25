import { ICustomer } from "@/interfaces/customer.interface";
import { MailIcon, Phone, UserCircle2 } from "lucide-react";
import { AppointmentList } from "./aside/appointments-list";
import { FromatedDate } from "@/lib/format-date";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function CustomerDetails({ customer }: { customer: ICustomer }) {
  const appointments = customer.appointments;
  return (
    <div className="flex flex-col  gap-4  max-h-full bg-background rounded-md  p-2 h-full">
      <header className="  max-h-[15%] text-[14px] border p-4 rounded ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle2 className="size-5" />
            <p className=" font-bold text-[18px]">
              {customer.firstName}, {customer.lastName}
            </p>
          </div>

          <div className="flex  text-sm space-x-1 text-gray-600 font-medium">
            <span> Cliente desde el</span>
            <FromatedDate
              date={new Date(customer.createdAt).toLocaleDateString()}
            />
          </div>
        </div>

        <div className="">
          <div className="flex items-center gap-2">
            <MailIcon className="size-4" />
            <p>{customer.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4" />
            <p>{customer.phone}</p>
          </div>
        </div>
      </header>
      <div className="h-[78%] space-y-2">
        <Label>Turnos agendados : {customer.appointments.length}</Label>
        <Separator />
        <div className=" max-h-[100%] h-[100%] overflow-auto bg-muted rounded">
          <AppointmentList appointments={appointments} />
        </div>
      </div>
    </div>
  );
}
