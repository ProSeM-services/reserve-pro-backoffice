import { IPayment } from "@/interfaces/payment.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FromatedDate } from "@/lib/format-date";
import { CalendarIcon } from "lucide-react";
import { PaymentStatusCell } from "@/pages/admin/components/payments/payment-status-cell";
import { PaymentByCell } from "@/pages/admin/components/payments/payment-by-cell";
import { PaymentVoucher } from "./payment-voucher";
import { formatCurrency } from "@/lib/utils/format-currency";

interface PaymentDetailCardProps {
  payment: IPayment;
}

export function PaymentDetailCard({ payment }: PaymentDetailCardProps) {
  return (
    <Card key={payment.id} className="max-md:text-sm">
      <CardHeader className="flex  flex-row max-md:items-center items-center justify-between py-0 pt-2   ">
        <CardTitle className=" font-medium flex items-center gap-1 max-md:text-xs">
          <CalendarIcon className="max-md:size-3" />{" "}
          <FromatedDate date={payment.date} />
        </CardTitle>
        <section className="flex flex-col md:items-end">
          <div className="flex items-center gap-2">
            <PaymentStatusCell paymentStatus={payment.status} />
            <PaymentVoucher payment={payment} />
          </div>
        </section>
      </CardHeader>
      <CardContent className=" py-0 pb-2">
        <p className="text-3xl max-md:text-xl mb-1">
          {formatCurrency(payment.amount)}
        </p>
        <div className="text-sm max-md:text-xs">
          <p className=" mb-1">
            <strong>Pagado por:</strong>{" "}
            <PaymentByCell payment_by={payment.payment_by} />
          </p>

          {payment.payment_method && (
            <p className=" mb-1">
              <strong>Método:</strong> {payment.payment_method}
            </p>
          )}
          {payment.notes && (
            <p className="">
              <strong>Notas:</strong> {payment.notes}
            </p>
          )}
          <p className="flex gap-2">
            <strong>Vencimiento:</strong>
            <FromatedDate date={payment.end_date} />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
