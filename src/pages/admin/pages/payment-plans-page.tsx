import { PaymentPlan } from "@/interfaces/payment-plans.interface";
import { PaymentPlanServices } from "@/services/payment-plans.service";
import { useEffect, useState } from "react";

export function PaymentPlansPage() {
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchPaymentPlans = async () => {
      try {
        setLoading(true);
        const res = await PaymentPlanServices.getAll();
        setPaymentPlans(res);
      } catch (error) {
        console.error("Error fetching payment plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentPlans();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Planes de Pago</h1>
      <p className="text-muted-foreground">
        Administra los planes de pago disponibles para tus clientes.
      </p>
      {/* Aquí puedes agregar componentes para listar, crear y editar planes de pago */}
      <div>
        {loading ? (
          "Cargando planes de pago..."
        ) : paymentPlans.length > 0 ? (
          <ul className="space-y-4">
            {paymentPlans.map((plan) => (
              <li
                key={plan.id}
                className="border rounded p-4 flex flex-col gap-2"
              >
                <span className="font-semibold">{plan.name}</span>
                <span className="text-sm text-muted-foreground">
                  {plan.description}
                </span>
                <span className="text-sm">Precio: ${plan.price}</span>
                <span className="text-sm">Duración: {plan.duration} días</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay planes de pago disponibles.</p>
        )}
      </div>
    </div>
  );
}
