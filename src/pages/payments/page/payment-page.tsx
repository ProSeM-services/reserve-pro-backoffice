import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreatePaymentSheet } from "../components/create-payment";
import { PaymentsTable } from "../components/payment-table/payment-table";
import { PaymentList } from "../components/payment-list";
import { PlanInformation } from "../components/plan-information";
import { useEffect } from "react";
import { SubscriptionServices } from "@/services/subscription.service";
import { setCurrentSubscription } from "@/store/feature/subscription/subscriptionSlice";

export function PaymentPage() {
  const { payments } = useAppSelector((s) => s.payments);
  const { fetched } = useAppSelector((s) => s.subscription);
  const {
    enterprise: { id },
  } = useAppSelector((s) => s.enterprise);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (fetched) return;
    const fetchSubscription = async () => {
      const res = await SubscriptionServices.getSubscription(id);
      dispatch(setCurrentSubscription(res));
    };

    fetchSubscription();
  }, []);
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
