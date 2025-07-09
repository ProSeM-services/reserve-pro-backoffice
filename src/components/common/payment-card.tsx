import { Payment } from "@/lib/constants/payments";
import { Banknote, Landmark, QrCode, Wallet } from "lucide-react";
interface CategoryCardProps {
  paymentMethod: Payment | string;
  selected?: boolean;
  size?: "sm" | "lg";
}

const IconConfig: Record<
  Payment,
  {
    icon: () => JSX.Element;
  }
> = {
  "Tarjeta Débito/Crédito": {
    icon: () => (
      <div className="text-green-500 bg-green-200 p-2 rounded-xl">
        <Wallet />
      </div>
    ),
  },
  Efectivo: {
    icon: () => (
      <div className="text-purple-500 bg-purple-200 p-2 rounded-xl">
        {" "}
        <Banknote />
      </div>
    ),
  },
  QR: {
    icon: () => (
      <div className="text-blue-500 bg-blue-200 p-2 rounded-xl">
        <QrCode />{" "}
      </div>
    ),
  },
  Transferencia: {
    icon: () => (
      <div className="text-orange-500 bg-orange-200 p-2 rounded-xl">
        {" "}
        <Landmark />
      </div>
    ),
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
          selected ? " text-white" : ""
        } flex items-center gap-2 shadow-md  rounded-2xl pr-4 bg-slate-50`}
      >
        <Icon />
        {size === "lg" && paymentMethod}
      </div>
    </div>
  );
}
