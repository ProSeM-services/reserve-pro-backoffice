import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Trash2 } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { IAbsence, IUser } from "@/interfaces";
import { Permission } from "@/lib/constants/permissions";
import AuthorizationWrapper from "@/components/auth/authorization-wrapper";
import { AbsenceServices } from "@/services/absence.services";
import { cn } from "@/lib/utils";

interface MemberAbsencesProps {
  member: IUser;
}

export function MemberAbsences({ member }: MemberAbsencesProps) {
  const [absences, setAbsences] = useState<IAbsence[]>([]);
  const [range, setRange] = useState<DateRange | undefined>();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const selectedLabel = useMemo(() => {
    if (!range?.from || !range?.to) return "Seleccionar rango";
    return `${format(range.from, "dd/MM/yyyy")} - ${format(
      range.to,
      "dd/MM/yyyy"
    )}`;
  }, [range]);

  const loadAbsences = async () => {
    try {
      setLoading(true);
      const res = await AbsenceServices.getByUser(member.id);
      setAbsences(res);
    } catch (error) {
      toast({
        title: "No se pudieron cargar las ausencias",
        variant: "destructive",
      });
      console.log("Error fetching absences", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAbsences();
    setRange(undefined);
    setReason("");
  }, [member.id]);

  const handleCreate = async () => {
    if (!range?.from || !range?.to) {
      toast({
        title: "Seleccioná un rango de fechas",
        variant: "destructive",
      });
      return;
    }
    try {
      setCreating(true);
      const fromDate = range.from;
      const toDate = range.to;
      const start =
        fromDate && toDate && fromDate > toDate ? toDate : fromDate;
      const end = fromDate && toDate && fromDate > toDate ? fromDate : toDate;
      const payload = {
        UserId: member.id,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        reason: reason.trim() || undefined,
      };
      await AbsenceServices.create(payload);
      toast({ title: "Ausencia creada" });
      setRange(undefined);
      setReason("");
      await loadAbsences();
    } catch (error) {
      toast({
        title: "Error al crear la ausencia",
        description:
          "Verificá que no se solape con otra y que el rango sea válido.",
        variant: "destructive",
      });
      console.log("Error creating absence", error);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await AbsenceServices.delete(id);
      setAbsences((prev) => prev.filter((a) => a.id !== id));
      toast({ title: "Ausencia eliminada" });
    } catch (error) {
      toast({
        title: "No se pudo eliminar la ausencia",
        variant: "destructive",
      });
      console.log("Error deleting absence", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatRange = (start: string, end: string) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    return `${format(startDate, "dd/MM/yyyy")} - ${format(
      endDate,
      "dd/MM/yyyy"
    )}`;
  };

  return (
    <section className="space-y-2 border rounded-md p-3">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Ausencias del profesional</p>
          <p className="text-xs text-muted-foreground">
            Bloquea fechas donde no estará disponible.
          </p>
        </div>
      </header>

      <AuthorizationWrapper permission={Permission.UPDATE_WORKHOURS}>
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start gap-2",
                  !range?.from && !range?.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="size-4" />
                <span>{selectedLabel}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Input
            placeholder="Motivo (opcional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button onClick={handleCreate} isLoading={creating}>
            Guardar ausencia
          </Button>
        </div>
      </AuthorizationWrapper>

      <div className="space-y-2">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Cargando ausencias...
          </div>
        ) : absences.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No hay ausencias registradas.
          </p>
        ) : (
          absences.map((absence) => (
            <div
              key={absence.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {formatRange(absence.startDate, absence.endDate)}
                </p>
                {absence.reason && (
                  <p className="text-xs text-muted-foreground">
                    {absence.reason}
                  </p>
                )}
              </div>
              <AuthorizationWrapper permission={Permission.UPDATE_WORKHOURS}>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(absence.id)}
                  disabled={deletingId === absence.id}
                >
                  {deletingId === absence.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4 text-destructive" />
                  )}
                </Button>
              </AuthorizationWrapper>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
