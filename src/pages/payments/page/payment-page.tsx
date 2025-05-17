import { useAppSelector } from "@/store/hooks";
import { PaymentList } from "../components/payment-list";

export function PaymentPage() {
  const { payments } = useAppSelector((s) => s.payments);

  return (
    <div>
      <PaymentList payments={payments} />
    </div>
  );
}
