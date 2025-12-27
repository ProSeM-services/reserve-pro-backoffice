import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { createChartConfig } from "../../utils/generateCharConfig";
import { BarLoader } from "@/components/common/bar-loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MonthlyData } from "@/interfaces/stats.interface";
import useSession from "@/hooks/useSession";
import { MONTHS } from "../../constants";
import { EmptyList } from "@/components/common/emty-list";
import { useAppointmentStatsQuery } from "@/queries/stats";
import { useAppointmentsQuery } from "@/queries/appointments";

export function AppointmentStats() {
  const { session } = useSession();
  const [dateLimits, setDateLimits] = useState({
    start: 0,
    end: 11,
    year: 2025,
  });

  const { data: appointmentsData, isLoading: loadingAppointments } =
    useAppointmentsQuery();
  const { data: statsData, isLoading } = useAppointmentStatsQuery({
    start: dateLimits.start,
    end: dateLimits.end,
    year: dateLimits.year,
    enabled: !!session,
  });

  const data: MonthlyData[] = statsData || [];
  const chartConfig: ChartConfig = useMemo(() => {
    if (data.length === 0) return {};
    return createChartConfig(data);
  }, [data]);
  if (!session) return null;

  const appointments = appointmentsData?.appointments || [];

  if (appointments.length === 0 && !loadingAppointments && !isLoading)
    return (
      <Card className="size-full ">
        <div className="bg-card rounded h-full w-full  p-4 flex flex-col  ">
          <div className="flex items-center justify-between font-bold text-lg">
            <CardTitle>Turnos Agendados</CardTitle>
          </div>
          <EmptyList type="appointments" />
        </div>
      </Card>
    );

  const monthsList = MONTHS.slice(dateLimits.start, dateLimits.end + 1);

  return (
    <Card className=" w-full h-full max-md:h-[500px] flex flex-col justify-between  border-border ">
      <CardHeader>
        <CardTitle>Turnos Agendados</CardTitle>
        <CardDescription>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={dateLimits.year}
              onChange={(e) =>
                setDateLimits((prev) => ({
                  ...prev,
                  year: parseInt(e.target.value),
                }))
              }
            />
            <Select
              value={`${dateLimits.start}`}
              onValueChange={(value) =>
                setDateLimits((prev) => ({
                  ...prev,
                  start: parseInt(value),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Desde" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mes</SelectLabel>
                  {MONTHS.map((month, value) => (
                    <SelectItem value={`${value}`} key={value}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span> - </span>
            <Select
              value={`${dateLimits.end}`}
              onValueChange={(value) =>
                setDateLimits((prev) => ({
                  ...prev,
                  end: parseInt(value),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Hasta" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mes</SelectLabel>
                  {MONTHS.map((month, value) => (
                    <SelectItem
                      key={value}
                      value={`${value}`}
                      disabled={value <= dateLimits.start}
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className=" w-full h-full bg-accent relative rounded-xl">
            <BarLoader />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto max-h-[450px]  "
          >
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={0}
                axisLine={false}
                tickFormatter={(_, i) => monthsList[i]?.slice(0, 3) || ""}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              {Object.keys(chartConfig).map((serviceKey) => (
                <Bar
                  key={serviceKey}
                  dataKey={serviceKey}
                  fill={chartConfig[serviceKey].color}
                  radius={4}
                />
              ))}
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Visualiza en cada mes tus serivicos
        </div>
        <div className="leading-none text-muted-foreground">
          Desde {MONTHS[dateLimits.start]} - {MONTHS[dateLimits.end]}
        </div>
      </CardFooter>
    </Card>
  );
}
