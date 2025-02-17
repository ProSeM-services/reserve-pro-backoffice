import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAppointment } from "@/interfaces/appointments.interface";
import { EllipsisVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { PaymentCard } from "@/components/common/payment-card";
import { useState } from "react";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import { AppointmentStatusComponent } from "./appointmnet-status";
import { ContactButton } from "../contact-button";
import { AppointmentServices } from "@/services/appointment.services";
import AuthorizationWrapper from "@/components/auth/authorization-wrapper";
import { Permission } from "@/lib/constants/permissions";

interface AppointmentsTableActionsProps {
  appointment: IAppointment;
}
export function AppointmentsTableActions({
  appointment,
}: AppointmentsTableActionsProps) {
  const [selectedPayment, setSelectedPayment] = useState("");

  const [loading, setLoading] = useState(false);

  const { companies } = useAppSelector((s) => s.company);
  const companyId = appointment.companyId;
  const paymentOptions = companies.find(
    (e) => e.id === companyId
  )?.payment_methods;

  const { updateAppointment } = useCreatingFetch();
  const handleConfirmAppointment = async () => {
    if (!selectedPayment) return;
    try {
      setLoading(true);
      await updateAppointment(appointment.id, {
        confirmed: true,
        payment_method: selectedPayment,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleCancelAppointment = async () => {
    try {
      setLoading(true);
      if (!appointment.canceled) {
        await AppointmentServices.cancelAppointment(appointment.id);
      } else {
        await AppointmentServices.reactiveAppointment(appointment.id);
      }
      await updateAppointment(appointment.id, {
        canceled: !appointment.canceled,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (appointment.confirmed && appointment.payment_method) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center w-full">
          <PaymentCard
            paymentMethod={appointment.payment_method}
            selected
            size="sm"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="p-2 hover:bg-muted cursor-pointer text-sm">
            <Dialog>
              <DialogTrigger className="flex items-center gap-2">
                <AppointmentStatusComponent statuts="confirmed" />
                <span>Modificar</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modificacion de pago</DialogTitle>
                  <DialogDescription>
                    Esta acción dará por modificará el método de pago
                  </DialogDescription>
                </DialogHeader>

                <Label>
                  Metodo de pago seleccionado:{" "}
                  <PaymentCard
                    paymentMethod={appointment.payment_method}
                    selected={false}
                  />
                </Label>
                <Select onValueChange={(value) => setSelectedPayment(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Metodo de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentOptions?.map((method) => (
                      <SelectItem value={method} key={method}>
                        <PaymentCard paymentMethod={method} selected={false} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  disabled={
                    !selectedPayment ||
                    loading ||
                    appointment.payment_method === selectedPayment
                  }
                  onClick={handleConfirmAppointment}
                  isLoading={loading}
                >
                  Confimar
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center w-full">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!appointment.canceled && (
          <div className="p-2 hover:bg-muted cursor-pointer text-sm">
            <Dialog>
              <DialogTrigger className="flex items-center gap-2">
                <AppointmentStatusComponent statuts="confirmed" />
                <span>Confirmar</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmacion del turno</DialogTitle>
                  <DialogDescription>
                    Esta acción dará por realizado el turno. Seleccionar el
                    método de pago por el cliente.
                  </DialogDescription>
                </DialogHeader>

                <Label>${appointment.price}</Label>
                <Select onValueChange={(value) => setSelectedPayment(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Metodo de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentOptions?.map((method) => (
                      <SelectItem value={method} key={method}>
                        <PaymentCard paymentMethod={method} selected={false} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  disabled={!selectedPayment || loading}
                  onClick={handleConfirmAppointment}
                  isLoading={loading}
                >
                  Confimar
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        )}
        <AuthorizationWrapper permission={Permission.UPDATE_APPOINTMENTS}>
          {" "}
          <div
            className="p-2 hover:bg-muted cursor-pointer text-sm"
            aria-disabled
          >
            <Dialog>
              <DialogTrigger className="flex items-center gap-2">
                <AppointmentStatusComponent
                  statuts={appointment.canceled ? "pending" : "canceled"}
                />
                <span>{appointment.canceled ? "Reactivar" : "Cancelar"}</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {" "}
                    {appointment.canceled
                      ? "Reactivación del turno"
                      : "Cancelación del turno"}
                  </DialogTitle>
                  <DialogDescription>
                    Esta acción volverá a activar el turno.
                  </DialogDescription>
                  <DialogDescription>
                    El cliente recibirá un mail notificándole que su turno fue
                    reactivado. Por favor, coordine esta acción con el mismo.
                  </DialogDescription>
                </DialogHeader>

                <Button
                  onClick={handleCancelAppointment}
                  isLoading={loading}
                  variant={appointment.canceled ? "default" : "destructive"}
                >
                  Confirmar
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </AuthorizationWrapper>

        <div className="p-2 hover:bg-muted cursor-pointer text-sm">
          <ContactButton phoneNumber={appointment.phone} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
