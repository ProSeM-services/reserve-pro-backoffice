import { Calendar } from "lucide-react";
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
import { useEffect, useState } from "react";

import { StatsServices } from "@/services/stats.services";
import { setAuthInterceptor } from "@/config/axios.config";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAppointmentsStats,
  setAppointmentsStatsDateLimits,
  setINITIAL_DATE_LIMIT,
} from "@/store/feature/stats/statsSlices";
import { MonthlyData } from "@/interfaces/stats.interface";
import useSession from "@/hooks/useSession";
import { MONTHS } from "../../constants";

export function AppointmentStats() {
  const { session } = useSession();
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  const dispatch = useAppDispatch();
  const { appointmentStats, dateLimits, INITIAL_DATE_LIMIT } = useAppSelector(
    (s) => s.stats
  );
  const { appointments, fetched: allAppointmentFetched } = useAppSelector(
    (s) => s.appointments
  );
  const { end, start, year } = dateLimits;
  useEffect(() => {
    if (
      appointmentStats.length > 0 &&
      INITIAL_DATE_LIMIT.start === start &&
      INITIAL_DATE_LIMIT.end === end &&
      INITIAL_DATE_LIMIT.year === year
    ) {
      setData(appointmentStats);
      setChartConfig(createChartConfig(appointmentStats));

      return;
    }

    if (!session.session || !session.accessToken) return;
    const fetch = async () => {
      try {
        setLoading(true);
        setFetched(false);
        await setAuthInterceptor(session.accessToken);
        const res = await StatsServices.getAppointmentStats(
          dateLimits.start,
          dateLimits.end,
          dateLimits.year
        );
        setChartConfig(createChartConfig(res));
        setData(res);
        dispatch(setAppointmentsStats(res));
        dispatch(setINITIAL_DATE_LIMIT(dateLimits));
      } catch (error) {
        console.log("Error fetching today appointments : ", error);
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };

    fetch();
  }, [session.session, dateLimits]);

  if (!session.session) {
    return null; // Evitar renderizado hasta que la sesión esté disponible
  }
  if (fetched && data.length === 0) {
    return <div>No data</div>;
  }

  if (appointments.length === 0 && allAppointmentFetched)
    return (
      <Card className="flex flex-col  h-full   w-full p-1">
        <div className="bg-card rounded h-full w-full  p-4 flex flex-col  ">
          <div className="flex items-center justify-between font-bold text-lg">
            <CardTitle>Turnos Agendados</CardTitle>
          </div>

          <div className="flex-grow flex flex-col justify-center items-center text-gray-400">
            <Calendar className="size-28" />
            <p className="text-wrap w-1/2 text-center">
              No hay informacion de turnos agendados para cargar
            </p>
          </div>
        </div>
      </Card>
    );
  return (
    <Card className=" w-full h-full flex flex-col justify-between  border-border ">
      <CardHeader>
        <CardTitle>Turnos Agendados</CardTitle>
        <CardDescription>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={year}
              onChange={(e) =>
                dispatch(
                  setAppointmentsStatsDateLimits({
                    key: "year",
                    value: parseInt(e.target.value),
                  })
                )
              }
            />
            <Select
              value={`${start}`}
              onValueChange={(value) =>
                dispatch(
                  setAppointmentsStatsDateLimits({
                    key: "start",
                    value: parseInt(value),
                  })
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Desde" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mes</SelectLabel>
                  {MONTHS.map((month, value) => (
                    <SelectItem value={`${value + 1}`} key={value}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span> - </span>
            <Select
              value={`${end}`}
              onValueChange={(value) =>
                dispatch(
                  setAppointmentsStatsDateLimits({
                    key: "end",
                    value: parseInt(value),
                  })
                )
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
                      value={`${value + 1}`}
                      disabled={value + 1 <= start}
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
      <CardContent className=" w-5/6 mx-auto">
        {loading ? (
          <div className=" w-full h-full bg-accent relative rounded-xl">
            <BarLoader />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={2}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              {/* Generamos las barras dinámicamente */}
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
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
