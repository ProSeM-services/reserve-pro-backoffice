import { EmptyList } from "@/components/common/emty-list";
import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { UserCircle } from "lucide-react";

export function SalesStats() {
  const { appointments } = useAppSelector((s) => s.appointments);
  const confirmedAppointments = appointments.filter((app) => app.confirmed);
  if (confirmedAppointments.length === 0) {
    return (
      <Card className="size-full ">
        <div className="bg-card rounded h-full w-full  p-4 flex flex-col  ">
          <div className="flex items-center justify-between font-bold text-lg">
            <CardTitle>Turnos confirmados</CardTitle>
          </div>

          <EmptyList type="appointments" />
        </div>
      </Card>
    );
  }
  return (
    <Card className="p-4 flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-2">
        <CardTitle>Turnos confirmados</CardTitle>
        <span>Turnos confirmados</span>
      </div>
      <br />
      <div className="flex flex-col gap-4">
        {confirmedAppointments.map((appointment) => (
          <div className="flex justify-between">
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
    </Card>
  );
}

function PriceFromServices({ serviceId }: { serviceId: string }) {
  const { services } = useAppSelector((s) => s.service);

  const service = services.find((serv) => serv.id === serviceId);

  if (!service) return <></>;

  return <>$ {service.price}</>;
}
