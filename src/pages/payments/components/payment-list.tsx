import { IPayment } from "@/interfaces/payment.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FromatedDate } from "@/lib/format-date";

interface PaymentListProps {
  payments: IPayment[];
}

export function PaymentList({ payments }: PaymentListProps) {
  if (payments.length === 0) {
    return <p className="text-muted-foreground">No hay pagos registrados.</p>;
  }

  return (
    <div className="grid gap-4">
      {payments.map((payment) => (
        <Card key={payment.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">
              {format(new Date(payment.date), "PPPpp")}
            </CardTitle>
            <Badge
              variant={getStatusVariant(payment.status)}
              className="uppercase text-xs"
            >
              {payment.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-1">
              <strong>Monto:</strong> ${payment.amount.toFixed(2)}
            </p>
            <p className="text-sm mb-1">
              <strong>Pagado por:</strong> {payment.payment_by}
            </p>
            <p className="text-sm mb-1 flex items-center gap-1">
              <strong>Vencimiento:</strong>
              <FromatedDate date={payment.end_date} />
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
      ))}
    </div>
  );
}

// Mapeo de status a estilos de badge
function getStatusVariant(
  status: IPayment["status"]
): "default" | "destructive" | "outline" | "secondary" {
  switch (status) {
    case "paid":
      return "default";
    case "pending":
      return "outline";
    case "failed":
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}
