import { ChartConfig } from "@/components/ui/chart"; // Ajusta la ruta según corresponda
import { MonthlyData } from "../models";

export function createChartConfig(res: MonthlyData[]) {
  // Obtenemos las claves de servicios a partir del primer objeto en la respuesta
  const serviceKeys = Object.keys(res[0]).filter(
    (key) => key !== "month" && key !== "fill"
  );

  // Generamos el objeto chartConfig dinámicamente
  const dynamicChartConfig: ChartConfig = serviceKeys.reduce(
    (config, key, index) => {
      config[key] = {
        label: key,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return config;
    },
    {} as ChartConfig
  );

  return dynamicChartConfig;
}
