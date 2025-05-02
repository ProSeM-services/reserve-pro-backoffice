import useSession from "@/hooks/useSession";
import { IAppointment } from "@/interfaces/appointments.interface";
import {
  addDays,
  isWithinInterval,
  parseISO,
  format,
  startOfDay,
  endOfDay,
} from "date-fns";
import { useState } from "react";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { AppointmnetCard } from "./appointment-card";

interface IWeekData {
  labelDay: string;
  dd_mm: string;
  appointments: IAppointment[];
}

export function CalendarAppointments({
  appointments,
}: {
  appointments: IAppointment[];
}) {
  const [start, setStart] = useState<Date>(startOfDay(new Date()));
  const [direction, setDirection] = useState<number>(0);

  const moveForward = () => {
    setDirection(1);
    setStart((s) => addDays(s, 1));
  };

  const moveBack = () => {
    setDirection(-1);
    setStart((s) => addDays(s, -1));
  };

  const end = endOfDay(addDays(start, 4));
  const daysInRange: Date[] = [];
  let currentDate = start;
  while (currentDate <= end) {
    daysInRange.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  const { member } = useSession();
  if (!member) return;

  const appointmentsByDay: Record<string, IAppointment[]> = appointments.reduce(
    (acc, appointment) => {
      const appointmentDate = parseISO(appointment.date);

      if (
        isWithinInterval(appointmentDate, {
          start: startOfDay(start),
          end: endOfDay(end),
        })
      ) {
        const dayKey = format(appointmentDate, "yyyy-MM-dd");
        if (!acc[dayKey]) acc[dayKey] = [];
        acc[dayKey].push(appointment);
      }
      return acc;
    },
    {} as Record<string, IAppointment[]>
  );

  const finalData: IWeekData[] = daysInRange.map((day) => {
    const dayKey = format(day, "yyyy-MM-dd");
    // console.log("dayKey", dayKey);
    return {
      labelDay: format(day, "EEEE", { locale: es }),
      dd_mm: format(day, "dd/MM", { locale: es }),
      appointments: appointmentsByDay[dayKey] || [],
    };
  });

  return (
    <div className="flex items-start gap-4 p-4 h-full">
      <Button variant={"secondary"} className="mt-6" onClick={moveBack}>
        <ChevronLeft />
      </Button>
      <motion.div
        className="flex-grow h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="flex w-full border h-full max-h-full"
          key={start.toISOString()}
          initial={{ x: direction * 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {finalData.map((data) => (
            <div key={data.dd_mm} className="flex-grow max-w-[20%] w-[20%]">
              <header className="flex flex-col justify-center items-center p-2 bg-gray-0 text-sm text-gray-700 font-semibold border-l h-[10%]">
                <div>{data.labelDay}</div>
                <div>{data.dd_mm}</div>
              </header>
              <section className="flex flex-col gap-2 p-1 relative border-t border-l border-gray-200 bg-gray-50 h-[90%] overflow-auto">
                {data.appointments.map((appointment) => (
                  <AppointmnetCard
                    appointment={appointment}
                    key={appointment.id}
                  />
                ))}
              </section>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <Button variant={"secondary"} className="mt-6" onClick={moveForward}>
        <ChevronRight />
      </Button>
    </div>
  );
}
