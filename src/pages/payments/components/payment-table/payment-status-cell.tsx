import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/interfaces/payment.interface";

export function PaymentStatusCell({
  paymentStatus,
}: {
  paymentStatus: PaymentStatus;
}) {
  type TConfig = {
    label: string;
    variant?:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | null
      | undefined;
    color: string; // Tailwind class o valor hex
  };

  const Config: Record<PaymentStatus, TConfig> = {
    cancelled: {
      label: "Cancelado",
      variant: "outline",
      color: "#9CA3AF", // Gray-400
    },
    failed: {
      label: "Fallido",
      variant: "destructive",
      color: "#EF4444", // Red-500
    },
    paid: {
      label: "Pago",
      variant: "default",
      color: "#10B981", // Green-500
    },
    pending: {
      label: "Pendiente",
      variant: "secondary",
      color: "#F59E0B", // Yellow-500
    },
  };

  const { label, variant, color } = Config[paymentStatus];

  return (
    <Badge variant={variant} style={{ backgroundColor: color }}>
      {label}
    </Badge>
  );
}
