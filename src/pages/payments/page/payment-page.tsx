import { useAppSelector } from "@/store/hooks";
import { CreatePaymentSheet } from "../components/create-payment";
import { PaymentsTable } from "../components/payment-table/payment-table";
import { PaymentList } from "../components/payment-list";
import { PlanInformation } from "../components/plan-information";

export function PaymentPage() {
  const { payments } = useAppSelector((s) => s.payments);
  return (
    <div className="space-y-4">
      <CreatePaymentSheet />
      <PlanInformation />
      <div className="max-md:hidden">
        <PaymentsTable />
      </div>
      <div className="md:hidden">
        <PaymentList payments={payments} />
      </div>
    </div>
  );
}
