import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useState } from "react";
import { SubscribeButton } from "./subscribe";

type TPlanOption = {
  period: string;
  amount: number;
  frequency: number;
  discount?: number;
};
export function PlanInformation() {
  const mensualValue = 20000;
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

  return (
    <div className="p-4 border rounded-lg flex flex-col gap-4 text-sm">
      <Label className="text-lg">Información de plan</Label>
      <section className="flex justify-between w-1/2">
        <div>
          <div className="flex items-center gap-2">
            <p>Nombre</p>
            <strong>Reserve Pro Basic</strong>
          </div>
          <div className="flex items-center gap-2">
            <p>ID del plan</p>
            <strong>3803466</strong>
          </div>
          <div className="flex items-center gap-2">
            <p>Fecha de alta</p>
            <strong>11/12/2023, 12:45:51 pm</strong>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p>Estado del plan</p>
            <strong>Activo</strong>
          </div>
          <div className="flex items-center gap-2">
            <p>Vencimiento</p>
            <strong>11/06/2025</strong>
          </div>
          <div className="flex items-center gap-2">
            <p>Período de pago</p>
            <strong>Mensual</strong>
          </div>
        </div>
      </section>

      <section>
        <Label className="text-lg">Período de pago</Label>
        <div className="flex flex-wrap gap-4">
          {options.map((option) => (
            <div
              className={`border size-32 flex flex-col justify-center  items-center cursor-pointer rounded  transition-all duration-150 relative ${
                selectedOption.period === option.period
                  ? " border-sky-400 font-semibold bg-gray-50"
                  : ""
              }`}
              onClick={() => setSelectedOption(option)}
            >
              <p>{option.period}</p>
              <p>{formatCurrency(option.amount)}</p>

              {option.discount && (
                <Badge className="absolute -top-2 -right-2">
                  %{option.discount} off
                </Badge>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="flex  justify-end">
        <div className="flex flex-col gap-2 items-center">
          <Label className="text-lg">Importe a pagar</Label>
          <p className="text-xl text-sky-600">
            {formatCurrency(selectedOption.amount)}
          </p>
          <SubscribeButton
            amount={selectedOption.amount}
            frequency={selectedOption.frequency}
          />
        </div>
      </section>
    </div>
  );
}
