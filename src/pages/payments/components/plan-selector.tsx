import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentPlan } from "@/interfaces/payment-plans.interface";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";

export function PlanSelector({
  selectPlan,
}: {
  selectPlan: (data: PaymentPlan) => void;
}) {
  const { paymentsPlans } = useAppSelector((s) => s.paymentsPlans);

  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>();

  const handleSubmitNewPlan = async () => {
    if (!selectedPlan) return;
    selectPlan(selectedPlan);

    return;
  };

  const handleSelectPlan = (plan: PaymentPlan) => {
    if (selectedPlan && selectedPlan.id === plan.id)
      return setSelectedPlan(undefined);

    setSelectedPlan(plan);
  };
  return (
    <section className="flex flex-col gap-2 items-start">
      <div className="flex  gap-4 justify-center w-full">
        {paymentsPlans.map((plan) => (
          <Card
            key={plan.id}
            onClick={() => handleSelectPlan(plan)}
            className={`text-center cursor-pointer transition-all duration-300  ${
              selectedPlan?.name === plan.name
                ? " w-1/2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:brightness-110 "
                : " w-1/4 text-gray-500"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <strong className="text-xl">{formatCurrency(plan.price)}</strong>

              <p className="text-[14px]">
                Este plan te permite crear {plan.company_limit} sucursales
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button disabled={!selectedPlan} onClick={handleSubmitNewPlan}>
        Confirmar
      </Button>
    </section>
  );
}
