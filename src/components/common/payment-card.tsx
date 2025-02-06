import { Payment } from "@/lib/constants/payments";
import { Banknote, Landmark, LucideProps, QrCode, Wallet } from "lucide-react";
interface CategoryCardProps {
  paymentMethod: Payment | string;
  selected?: boolean;
  size?: "sm" | "lg";
}

const IconConfig: Record<
  Payment,
  {
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }
> = {
  "Tarjeta Débito/Crédito": {
    icon: Wallet,
  },
  Efectivo: {
    icon: Banknote,
  },
  QR: {
    icon: QrCode,
  },
  Transferencia: {
    icon: Landmark,
  },
};
export function PaymentCard({
  paymentMethod,
  selected = false,
  size = "lg",
}: CategoryCardProps) {
  const { icon: Icon } = IconConfig[paymentMethod as Payment];
  return (
    <div className="relative">
      <div
        className={`${
          selected ? "bg-primary text-white" : "bg-muted"
        } text-foreground p-2 rounded-md transition-all duration-200 cursor-pointer  flex  items-center gap-2 text-nowrap `}
      >
        <Icon className="size-4" strokeWidth={size === "sm" ? 2 : 1} />
        {size === "lg" && paymentMethod}
      </div>
    </div>
  );
}
