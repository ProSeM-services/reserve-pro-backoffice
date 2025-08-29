import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PaymentsTable } from "../components/payment-table/payment-table";
import { PaymentList } from "../components/payment-list";
import { PlanInformation } from "../components/plan-information";
import { useEffect, useState } from "react";
import { SubscriptionServices } from "@/services/subscription.service";
import { setCurrentSubscription } from "@/store/feature/subscription/subscriptionSlice";
import LoaderWrapper from "@/components/common/loader-wrapper";

export function PaymentPage() {
  const { payments } = useAppSelector((s) => s.payments);
  const { fetched, currentSubscription } = useAppSelector(
    (s) => s.subscription
  );
  const {
    enterprise: { id },
  } = useAppSelector((s) => s.enterprise);
  const [loading, setLoading] = useState(!fetched ? true : false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (fetched) return;
    const fetchSubscription = async () => {
      setLoading(true);
      console.log("ID", id);
      const res = await SubscriptionServices.getSubscription(id);
      dispatch(setCurrentSubscription(res));
      setLoading(false);
    };

    fetchSubscription();
  }, []);
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
          <PaymentsTable />
        </div>
        <div className="md:hidden">
          <PaymentList payments={payments} />
        </div>
      </div>
    </LoaderWrapper>
  );
}
