import { IPayment } from "@/interfaces/payment.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FromatedDate } from "@/lib/format-date";
import { CalendarIcon } from "lucide-react";
import { PaymentStatusCell } from "@/pages/admin/components/payments/payment-status-cell";
import { PaymentByCell } from "@/pages/admin/components/payments/payment-by-cell";
import { PaymentVoucher } from "./payment-voucher";

interface PaymentDetailCardProps {
  payment: IPayment;
}

export function PaymentDetailCard({ payment }: PaymentDetailCardProps) {
  return (
    <Card key={payment.id}>
      <CardHeader className="flex flex-row items-center justify-between py-0 pt-2  ">
        <CardTitle className="text-base font-medium flex items-center gap-1">
          <CalendarIcon /> <FromatedDate date={payment.date} />
        </CardTitle>
        <section className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <PaymentStatusCell paymentStatus={payment.status} />
            <PaymentVoucher payment={payment} />
          </div>
          <p className="text-sm mb-1 flex items-center gap-1 text-gray-500">
            <strong>Vencimiento:</strong>
            <FromatedDate date={payment.end_date} />
          </p>
        </section>
      </CardHeader>
      <CardContent className=" py-0 pb-2">
        <p className="text-3xl mb-1">${payment.amount.toFixed(2)}</p>
        <p className="text-sm mb-1">
          <strong>Pagado por:</strong>{" "}
          <PaymentByCell payment_by={payment.payment_by} />
        </p>

        {payment.payment_method && (
          <p className="text-sm mb-1">
            <strong>Método:</strong> {payment.payment_method}
          </p>
        )}
        {payment.notes && (
          <p className="text-sm">
            <strong>Notas:</strong> {payment.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
