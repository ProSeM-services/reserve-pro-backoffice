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
        </CardDescription>
      </CardHeader>

      <CardContent>
        <section className="space-y-4">
          <Label className="text-lg">Período de pago</Label>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            obcaecati?
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
            />
          </div>
        </section>
      </CardFooter>
    </Card>
  );
}
