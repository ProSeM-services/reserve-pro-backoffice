import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarX, Loader2 } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AbsenceServices } from "@/services/absence.services";
import { IAbsence } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { useMembersQuery } from "@/queries/members";

export function AbsencesTable() {
  const [absences, setAbsences] = useState<IAbsence[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data: members = [] } = useMembersQuery();

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        setLoading(true);
        const res = await AbsenceServices.getAll();
        setAbsences(res);
      } catch (error) {
        toast({
          title: "No se pudieron cargar las ausencias",
          variant: "destructive",
        });
        console.log("Error fetching all absences", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbsences();
  }, []);

  const rows = useMemo(() => {
    return absences.map((a) => {
      const member = members.find((m) => m.id === a.UserId);
      return {
        ...a,
        memberName: member ? member.fullName : a.UserId,
        memberEmail: member?.email,
      };
    });
  }, [absences, members]);

  const formatRange = (start: string, end: string) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    return `${format(startDate, "dd/MM/yyyy")} - ${format(
      endDate,
      "dd/MM/yyyy"
    )}`;
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Cargando ausencias...
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground py-10">
        <CalendarX className="size-10" />
        <p className="text-sm">No hay ausencias registradas en la empresa.</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profesional</TableHead>
            <TableHead>Rango</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Creado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((absence) => (
            <TableRow key={absence.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{absence.memberName}</span>
                  {absence.memberEmail && (
                    <span className="text-xs text-muted-foreground">
                      {absence.memberEmail}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{formatRange(absence.startDate, absence.endDate)}</TableCell>
              <TableCell>{absence.reason || "-"}</TableCell>
              <TableCell>
                {absence.createdAt
                  ? format(parseISO(absence.createdAt), "dd/MM/yyyy")
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
