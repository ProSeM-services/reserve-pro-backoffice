import { IPayment } from "@/interfaces/payment.interface";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FileCheck } from "lucide-react";
import { getS3Url } from "@/lib/utils/s3-image";

export function PaymentVoucher({ payment }: { payment: IPayment }) {
  if (!payment.image) return null;

  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <FileCheck />
      </DialogTrigger>
      <DialogContent>
        <img src={getS3Url(payment.image)} />
      </DialogContent>
    </Dialog>
  );
}
