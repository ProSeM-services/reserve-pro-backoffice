import { IPayment } from "@/interfaces/payment.interface";
import { PaymentDetailCard } from "./payment-detail-card";
import { EmptyList } from "@/components/common/emty-list";

interface PaymentListProps {
  payments: IPayment[];
}

export function PaymentList({ payments }: PaymentListProps) {
  if (payments.length === 0) {
    return (
      <div>
        <p className="text-muted-foreground">No hay pagos registrados.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {payments.length === 0 ? (
        <EmptyList type="paymentPlan" />
      ) : (
        payments.map((payment) => (
          <PaymentDetailCard payment={payment} key={payment.id} />
        ))
      )}
    </div>
  );
}
