import { Button } from "@/components/ui/button";
import { CreatePaymentPlanForm } from "../components/form/create-payment-plan-form";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { PaymentPlanServices } from "@/services/payment-plans.service";
import { useToast } from "@/components/ui/use-toast";

export function PaymentPlansPage() {
  const { paymentsPlans } = useAppSelector((s) => s.paymentsPlans);
  const { enterprises } = useAppSelector((s) => s.enterprise);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleDeletePlan = async (id: string) => {
    try {
      setLoading(true);
      console.log("plan Id:", id);
      console.log(
        "enterprises:",
        enterprises.filter((enterpirse) => enterpirse.payment_plan === id)
          .length > 0
      );
      if (
        enterprises.filter((enterpirse) => enterpirse.payment_plan === id)
          .length > 0
      ) {
        toast({
          title: "Este Plan se encuentra seleccionado por uno o mas negocios",
          variant: "destructive",
        });
        return;
      }

      await PaymentPlanServices.delete(id);
      toast({
        title: "Plan borrado",
        description: "",
      });
    } catch (error) {
      console.log("Error deleting plan", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-2xl font-bold">Planes de Pago</h1>
        <p className="text-muted-foreground">
          Administra los planes de pago disponibles para tus clientes.
        </p>
      </header>
      <CreatePaymentPlanForm />
      <div>
        {paymentsPlans.length > 0 ? (
          <div className="space-y-2">
            <p className="font-medium">
              {paymentsPlans.length} Planes de pago creados
            </p>
            <ul className="space-y-1 ">
              {paymentsPlans.map((plan) => (
                <li
                  key={plan.id}
                  className="border rounded p-4 flex  justify-between "
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">{plan.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {plan.description}
                    </span>
                    <span className="text-sm">Precio: ${plan.price}</span>
                    <span className="text-sm">
                      Duración: {plan.duration} días
                    </span>
                  </div>
                  <Button
                    variant={"destructive"}
                    disabled={loading}
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No hay planes de pago disponibles.</p>
        )}
      </div>
    </div>
  );
}
