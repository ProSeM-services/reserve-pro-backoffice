import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useState } from "react";
import { SubscribeButton } from "./subscribe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { AlertCircleIcon } from "lucide-react";
import { PlanSelector } from "./plan-selector";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PaymentPlan } from "@/interfaces/payment-plans.interface";
import { FromatedDate } from "@/lib/format-date";
import { ISubscription } from "@/interfaces/subscription.schema";
type TPlanOption = {
  period: string;
  amount: number;
  frequency: number;
  discount?: number;
};
export function PlanInformation() {
  const { paymentsPlans } = useAppSelector((s) => s.paymentsPlans);
  const { currentSubscription } = useAppSelector((s) => s.subscription);

  const paymentPlan = paymentsPlans.filter(
    (plan) => plan.id === currentSubscription?.PlanId
  )[0];
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>(); //state for select plan fpr new customers
  if (selectedPlan) {
    return (
      <Card>
        <CardHeader>
          <Alert className="border-sky-400 text-sky-500">
            <AlertTitle>Plan seleccionado</AlertTitle>
            <AlertDescription>
              Has seleccionad el plan : {selectedPlan.name}
            </AlertDescription>
          </Alert>
        </CardHeader>

        <CardContent>
          <section className=" w-full flex  justify-end">
            <div className="flex flex-col gap-2 items-center">
              <Label className="text-sm">Importe a pagar</Label>
              <p className="text-xl text-indigo-500 font-semibold">
                {formatCurrency(selectedPlan.price)}
              </p>
              <SubscribeButton
                amount={selectedPlan.price}
                frequency={1}
                plan_id={selectedPlan.id}
              />
            </div>
          </section>
        </CardContent>
      </Card>
    );
  }
  if (!currentSubscription)
    return (
      <Card>
        <CardHeader>
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>Sin Plan seleccionado</AlertTitle>
            <AlertDescription>
              Puedes seleccionar un plan para asignarlo a tu negocio.
            </AlertDescription>
          </Alert>
        </CardHeader>

        <CardContent>
          <PlanSelector selectPlan={setSelectedPlan} />
        </CardContent>
      </Card>
    );

  return (
    <PaymentPlanData
      currentSubscription={currentSubscription}
      paymentPlan={paymentPlan}
    />
  );
}

function PaymentPlanData({
  currentSubscription,
  paymentPlan,
}: {
  currentSubscription: ISubscription;
  paymentPlan: PaymentPlan;
}) {
  const mensualValue = currentSubscription.amount;

  const options: TPlanOption[] = [
    { period: "Mensual", amount: mensualValue, frequency: 1 },
    { period: "Trimestral", amount: mensualValue * 3, frequency: 3 },
    {
      period: "Semestral",
      amount: mensualValue * 6 * 0.8,
      discount: 20,
      frequency: 6,
    },
    { period: "Anual", amount: mensualValue * 12, frequency: 12 },
  ];
  const [selectedOption, setSelectedOption] = useState<TPlanOption>(options[0]);

  if (!paymentPlan) return;
  return (
    <Card className="p-4  rounded-lg flex flex-col gap-4 text-sm ">
      <CardHeader>
        <CardTitle className="text-lg">Información de plan</CardTitle>
        <CardDescription>
          <section className="flex justify-between w-1/2">
            <div>
              <div className="flex items-center gap-2">
                <p>Nombre</p>
                <strong>Reserve Pro Basic</strong>
              </div>
              <div className="flex items-center gap-2">
                <p>ID del plan</p>
                <strong>{currentSubscription.id.slice(0, 10)}</strong>
              </div>
              <div className="flex items-center gap-2">
                <p>Proximo vencimiento</p>
                <strong>
                  <FromatedDate date={currentSubscription.endDate} />
                </strong>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p>Estado del plan</p>
                <strong>{currentSubscription.status}</strong>
              </div>
              <div className="flex items-center gap-2">
                <p>Valor Mensual:</p>
                <strong>{formatCurrency(currentSubscription.amount)}</strong>
              </div>
              <div className="flex items-center gap-2">
                <p>Período de pago</p>
                <strong>Cada Mes</strong>
              </div>
            </div>
          </section>
        </CardDescription>
      </CardHeader>

      <CardContent className="hidden">
        <section className="space-y-4">
          <Label className="text-lg">Formas de pago</Label>
          <CardDescription>
            Selecciona el período de pago que prefieras. Los períodos más largos
            pueden tener descuentos aplicados.
            <br />
            Los valores están referenciados a tu plan seleccionado{" "}
            {`(${paymentPlan.name})`}
          </CardDescription>
          <div className="flex flex-wrap gap-4">
            {options.map((option) => (
              <div
                className={`border size-32 flex flex-col justify-center  items-center cursor-pointer rounded-xl  transition-all duration-150 relative ${
                  selectedOption.period === option.period
                    ? "  bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:brightness-110  "
                    : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <p>{option.period}</p>
                <p>{formatCurrency(option.amount)}</p>

                {option.discount && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-800 to-gray-600 shadow-md">
                    %{option.discount} off
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </section>
      </CardContent>

      <CardFooter>
        <section className=" w-full flex  justify-end">
          <div className="flex flex-col gap-2 items-center">
            <Label className="text-sm">Importe a pagar</Label>
            <p className="text-xl text-indigo-500 font-semibold">
              {formatCurrency(selectedOption.amount)}
            </p>
            <SubscribeButton
              amount={selectedOption.amount}
              frequency={selectedOption.frequency}
              plan_id={paymentPlan.id}
            />
          </div>
        </section>
      </CardFooter>
    </Card>
  );
}
