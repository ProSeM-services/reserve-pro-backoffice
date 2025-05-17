import { IPayment, PaymentStatus } from "@/interfaces/payment.interface";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { getS3Url } from "@/lib/utils/s3-image";
import { Button } from "@/components/ui/button";
import { PaymentServices } from "@/services/payment.services";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { setAuthInterceptor } from "@/config/axios.config";
import { FromatedDate } from "@/lib/format-date";

export function PaymentActionsCell({ payment }: { payment: IPayment }) {
  const [loading, setLoading] = useState(false);
  if (!payment.image) return null;
  const { toast } = useToast();
  const handleApprovePayment = async (status: PaymentStatus) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      await setAuthInterceptor(accessToken);
      await PaymentServices.updatePayment(payment.id, {
        status,
      });
      const title = status === "paid" ? "Pago aprobado" : "Pago rechazado";
      toast({
        title,
      });
    } catch (error) {
      toast({
        title: "Hubo un error al actualizar el estado del pago",
        variant: "destructive",
      });
      console.log("Error updating payment");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Menu />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Modificar estado del pago</DialogTitle>
        <DialogDescription>
          "Aprobar" si el pago ingresado es correcto. "Rechazar" en caso
          contrario
        </DialogDescription>

        <div className=" text-sm ">
          <p>${payment.amount}</p>
          <p>
            <FromatedDate date={payment.date} />
          </p>
        </div>
        <img src={getS3Url(payment.image)} />

        <div className="flex justify-center w-full">
          <Button
            onClick={() => handleApprovePayment("paid")}
            disabled={loading}
          >
            Aprobar
          </Button>
          <Button
            onClick={() => handleApprovePayment("failed")}
            variant={"destructive"}
            disabled={loading}
          >
            Rechazar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
