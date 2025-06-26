import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PaymentPlan } from "@/interfaces/payment-plans.interface";
import { formatCurrency } from "@/lib/utils/format-currency";
import { EnterpiseServices } from "@/services/enterprise.services";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";

export function PlanSelector() {
  const { paymentsPlans } = useAppSelector((s) => s.paymentsPlans);
  const { enterprise } = useAppSelector((s) => s.enterprise);

  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>();
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const handleSubmitNewPlan = async () => {
    if (!selectedPlan) return;
    try {
      setLoading(true);

      await EnterpiseServices.update(enterprise.id, {
        payment_plan: selectedPlan.id,
      });
      toast({
        title: "Plan de pago seleccionado",
      });
    } catch (error) {
      console.log("Error selecting new payment plan");
      toast({
        title: "Error al seleccionar plan de pago",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col gap-2 items-start">
      <div className="flex  gap-4 justify-center w-full">
        {paymentsPlans.map((plan) => (
          <Card
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`text-center cursor-pointer transition-all duration-300  ${
              selectedPlan?.name === plan.name
                ? " w-1/2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:brightness-110 "
                : " w-1/4"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <strong className="text-xl">{formatCurrency(plan.price)}</strong>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        disabled={!selectedPlan}
        isLoading={loading}
        onClick={handleSubmitNewPlan}
      >
        Confirmar
      </Button>
    </section>
  );
}
