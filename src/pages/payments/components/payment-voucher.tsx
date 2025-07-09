import { IPayment } from "@/interfaces/payment.interface";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FileCheck } from "lucide-react";
import { getS3Url } from "@/lib/utils/s3-image";
import { Button } from "@/components/ui/button";

export function PaymentVoucher({ payment }: { payment: IPayment }) {
  if (!payment.image) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} size="icon" className="p-0">
          <FileCheck />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <img src={getS3Url(payment.image)} />
      </DialogContent>
    </Dialog>
  );
}
