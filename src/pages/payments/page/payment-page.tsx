import { useAppSelector } from "@/store/hooks";
import { CreatePaymentSheet } from "../components/create-payment";
import { PaymentsTable } from "../components/payment-table/payment-table";
import { PaymentList } from "../components/payment-list";
import { PlanInformation } from "../components/plan-information";

export function PaymentPage() {
  const { payments } = useAppSelector((s) => s.payments);
  return (
    <div className="space-y-4">
      <section className=" flex justify-between items-center">
        <CreatePaymentSheet />
        <div className="bg-green-100 text-green-500 p-2 px-4 rounded-xl text-sm flex items-center gap-2 uppercase">
          <div className="p-1 bg-green-500 rounded-full"></div>
          <p>cuenta activa</p>
        </div>
      </section>
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
