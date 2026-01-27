import LoaderWrapper from "@/components/common/loader-wrapper";
import { PaymentList } from "../components/payment-list";
import { PaymentsTable } from "../components/payment-table/payment-table";
import { PlanInformation } from "../components/plan-information";
import { useSubscriptionQuery } from "@/queries/subscription";
import { usePaymentsQuery } from "@/queries/payments";

export function PaymentPage() {
  const enterpriseId = localStorage.getItem("enterpriseId") || "";
  const { data: payments = [], isLoading: paymentsLoading } = usePaymentsQuery();
  const { data: currentSubscription, isLoading: subscriptionLoading } =
    useSubscriptionQuery(enterpriseId, { enabled: !!enterpriseId });
  const loading = paymentsLoading || subscriptionLoading;

  return (
    <LoaderWrapper loading={loading} type="payments">
      <div className="space-y-4">
        <section className=" flex justify-between items-center">
          <div className="bg-green-100 text-green-500 p-2 px-4 rounded-xl text-sm flex items-center gap-2 uppercase">
            <div className="p-1 bg-green-500 rounded-full"></div>
            <p>{currentSubscription?.status}</p>
          </div>
        </section>
        <PlanInformation />
        <div className="max-md:hidden">
          <PaymentsTable payments={payments} />
        </div>
        <div className="md:hidden">
          <PaymentList payments={payments} />
        </div>
      </div>
    </LoaderWrapper>
  );
}
