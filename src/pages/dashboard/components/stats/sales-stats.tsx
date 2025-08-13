import { EmptyList } from "@/components/common/emty-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { UserCircle } from "lucide-react";

export function SalesStats() {
  const { appointments } = useAppSelector((s) => s.appointments);
  const confirmedAppointments = appointments.filter((app) => app.confirmed);
  if (confirmedAppointments.length === 0) {
    return (
      <Card className="flex flex-col size-full ">
        <CardHeader>
          <CardTitle>Turnos confirmados</CardTitle>
          <CardDescription>Turnos realizados y cobrados</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center flex-grow">
          <EmptyList type="appointments" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="p-4 flex flex-col gap-4 h-full">
      <CardHeader>
        <CardTitle>Turnos confirmados</CardTitle>
        <CardDescription>Turnos realizados y cobrados</CardDescription>
      </CardHeader>
      <CardContent className="h-[80%]">
        <div className="flex flex-col gap-4 h-full max-h-full overflow-auto">
          {confirmedAppointments.map((appointment) => (
            <div className="flex justify-between" key={appointment.id}>
              <div className="flex gap-2">
                <UserCircle />
                <div>
                  <Label>{appointment.fullName}</Label>
                  <p className="text-gray-500">{appointment.email}</p>
                </div>
              </div>

              <section className="flex flex-col items-end">
                <Label>
                  {appointment.price ? (
                    `$ ${appointment.price}`
                  ) : (
                    <PriceFromServices serviceId={appointment.ServiceId} />
                  )}
                </Label>
                <span>{appointment.payment_method}</span>
              </section>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PriceFromServices({ serviceId }: { serviceId: string }) {
  const { services } = useAppSelector((s) => s.service);

  const service = services.find((serv) => serv.id === serviceId);

  if (!service) return <></>;

  return <>$ {service.price}</>;
}
