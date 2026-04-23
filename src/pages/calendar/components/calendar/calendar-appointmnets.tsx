import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { IAppointment } from "@/interfaces/appointments.interface";
import { AppointmnetCard } from "./appointment-card";

const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

// Popover de detalles rápido para cada turno en la celda
function AppointmentPopoverContent({ appt }: { appt: IAppointment }) {
  const status = appt.canceled
    ? { label: "Cancelado", className: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" }
    : appt.confirmed
    ? { label: "Confirmado", className: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" }
    : { label: "Pendiente", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400" };

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-sm leading-tight">{appt.fullName}</p>
        <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap flex-shrink-0", status.className)}>
          {status.label}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="size-3 flex-shrink-0" />
          <span>{appt.time} hs</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="size-3 flex-shrink-0" />
          <span className="truncate">{appt.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="size-3 flex-shrink-0" />
          <span>{appt.phone}</span>
        </div>
        {appt.User && (
          <div className="flex items-center gap-2">
            <User className="size-3 flex-shrink-0" />
            <span>{appt.User.fullName}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Item de turno compacto con hover y popover de detalles
function CalendarDayAppointment({ appt }: { appt: IAppointment }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-1 text-[10px] leading-tight rounded px-1 py-0.5 truncate flex-shrink-0 cursor-pointer transition-colors",
            appt.canceled
              ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/50"
              : appt.confirmed
              ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950/40 dark:text-green-400 dark:hover:bg-green-900/50"
              : "bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:hover:bg-sky-900/50"
          )}
        >
          <span className="flex-shrink-0 font-medium">{appt.time}</span>
          <span className="truncate">{appt.fullName}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-64">
        <AppointmentPopoverContent appt={appt} />
      </PopoverContent>
    </Popover>
  );
}

export function CalendarAppointments({
  appointments,
}: {
  appointments: IAppointment[];
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [direction, setDirection] = useState<number>(0);

  const goToPrev = () => {
    setDirection(-1);
    setCurrentMonth((m) => startOfMonth(subMonths(m, 1)));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentMonth((m) => startOfMonth(addMonths(m, 1)));
  };

  const handleOpenSheet = (day: Date) => {
    setSelectedDay(day);
    setSheetOpen(true);
  };

  const calendarDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }),
    });
  }, [currentMonth]);

  const weeks = useMemo(() => chunk(calendarDays, 7), [calendarDays]);

  const appointmentsByDay = useMemo(
    () =>
      appointments.reduce<Record<string, IAppointment[]>>((acc, appt) => {
        const key = format(parseISO(appt.date), "yyyy-MM-dd");
        if (!acc[key]) acc[key] = [];
        acc[key].push(appt);
        return acc;
      }, {}),
    [appointments]
  );

  const selectedKey = selectedDay ? format(selectedDay, "yyyy-MM-dd") : null;
  const selectedAppts = selectedKey
    ? (appointmentsByDay[selectedKey] ?? []).sort((a, b) =>
        a.time.localeCompare(b.time)
      )
    : [];

  const monthLabel = format(currentMonth, "MMMM yyyy", { locale: es });
  const displayMonthLabel =
    monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

  const selectedDayLabel = selectedDay
    ? format(selectedDay, "EEEE d 'de' MMMM", { locale: es }).replace(
        /^\w/,
        (c) => c.toUpperCase()
      )
    : "";

  return (
    <>
      <div className="flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
          <h2 className="text-base font-semibold text-card-foreground">
            {displayMonthLabel}
          </h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={goToPrev}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNext}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 border-b border-border flex-shrink-0">
          {WEEKDAY_LABELS.map((l) => (
            <div
              key={l}
              className="py-2 text-center text-xs font-medium text-muted-foreground border-r border-border last:border-r-0"
            >
              {l}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={format(currentMonth, "yyyy-MM")}
            initial={{ x: direction * 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -30, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 flex flex-col min-h-0"
          >
            {weeks.map((week, weekIdx) => (
              <div
                key={weekIdx}
                className="flex flex-1 border-b border-border last:border-b-0 min-h-0"
              >
                {week.map((day) => {
                  const key = format(day, "yyyy-MM-dd");
                  const dayAppts = (appointmentsByDay[key] ?? []).sort((a, b) =>
                    a.time.localeCompare(b.time)
                  );
                  const isOutside = !isSameMonth(day, currentMonth);
                  const isTodayDay = isToday(day);
                  const isSelected =
                    selectedDay !== null && isSameDay(day, selectedDay);
                  const count = dayAppts.length;
                  const visible = dayAppts.slice(0, 3);
                  const overflow = count - 3;

                  return (
                    <div
                      key={key}
                      className={cn(
                        "flex-1 border-r border-border last:border-r-0 p-1.5 flex flex-col gap-0.5 min-w-0 overflow-hidden",
                        isOutside ? "bg-muted/20" : "bg-card",
                        isSelected && !isOutside && "bg-indigo-50 dark:bg-indigo-950/20"
                      )}
                    >
                      {/* Day number + open-sheet button */}
                      <div className="flex items-center justify-between mb-0.5 flex-shrink-0">
                        <span
                          className={cn(
                            "text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full leading-none",
                            isOutside && "text-muted-foreground/40",
                            !isOutside && !isTodayDay && !isSelected && "text-card-foreground",
                            isTodayDay && "bg-indigo-600 text-white font-bold",
                            isSelected && !isTodayDay && "bg-indigo-500 text-white"
                          )}
                        >
                          {format(day, "d")}
                        </span>

                        {count > 0 && !isOutside && (
                          <button
                            onClick={() => handleOpenSheet(day)}
                            className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-indigo-500 transition-colors group"
                          >
                            <span className="font-medium">{count}</span>
                            <ChevronRight className="size-2.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        )}
                      </div>

                      {/* Appointment items */}
                      {!isOutside &&
                        visible.map((appt) => (
                          <CalendarDayAppointment key={appt.id} appt={appt} />
                        ))}

                      {overflow > 0 && !isOutside && (
                        <span className="text-[10px] text-muted-foreground pl-1 flex-shrink-0">
                          +{overflow} más
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Day detail sidebar */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="flex flex-col w-full sm:w-[420px] md:min-w-0 md:max-w-[420px]"
        >
          <SheetHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-5 text-indigo-500" />
              <SheetTitle className="capitalize">{selectedDayLabel}</SheetTitle>
            </div>
            <SheetDescription>
              {selectedAppts.length === 0
                ? "Sin turnos agendados"
                : `${selectedAppts.length} turno${selectedAppts.length !== 1 ? "s" : ""} agendado${selectedAppts.length !== 1 ? "s" : ""}`}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 mt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedKey ?? "empty"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-3 pr-3"
              >
                {selectedAppts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
                    <CalendarDays className="size-10 opacity-30" />
                    <p className="text-sm">Sin turnos para este día.</p>
                  </div>
                ) : (
                  selectedAppts.map((appt) => (
                    <AppointmnetCard key={appt.id} appointment={appt} />
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
