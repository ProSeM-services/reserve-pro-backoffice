import { useMemo } from "react";
import { CalendarClock, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppointmentsQuery } from "@/queries/appointments";
import { useMembersQuery } from "@/queries/members";
import { useServicesQuery } from "@/queries/services";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { EmptyList } from "@/components/common/emty-list";
import { ScrollArea } from "@/components/ui/scroll-area";

export function UpcomingAppointments() {
  const { data } = useAppointmentsQuery();
  const { data: members = [] } = useMembersQuery();
  const { data: services = [] } = useServicesQuery();

  const upcoming = useMemo(() => {
    const all = data?.appointments || [];
    const now = new Date();

    return all
      .filter((app) => {
        if (app.canceled) return false;
        const appDate = new Date(app.date);
        return appDate >= new Date(now.toDateString());
      })
      .sort((a, b) => {
        const dateCompare =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      })
      .slice(0, 15);
  }, [data]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Hoy";
    if (date.toDateString() === tomorrow.toDateString()) return "Manana";

    return date.toLocaleDateString("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const getMember = (userId: string) =>
    members.find((m) => m.id === userId);

  const getService = (serviceId: string) =>
    services.find((s) => s.id === serviceId);

  if (!upcoming.length) {
    return (
      <Card className="size-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarClock className="size-5 text-muted-foreground" />
            Proximos turnos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <EmptyList type="appointments" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="size-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarClock className="size-5 text-muted-foreground" />
            Proximos turnos
          </CardTitle>
          <Badge variant="secondary" className="font-normal">
            {upcoming.length} pendientes
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-3 pb-3">
        <ScrollArea className="h-full pr-3">
          <div className="space-y-2">
            {upcoming.map((app) => {
              const member = getMember(app.UserId);
              const service = getService(app.ServiceId);
              const isToday =
                new Date(app.date).toDateString() ===
                new Date().toDateString();

              return (
                <div
                  key={app.id}
                  className={`group relative rounded-lg border p-3 transition-colors duration-150 hover:bg-accent/50 ${
                    isToday ? "border-l-[3px] border-l-sky-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {member ? (
                        <MemberAvatar member={member} size="xs" />
                      ) : (
                        <div className="size-6 rounded-full bg-muted flex items-center justify-center">
                          <User className="size-3.5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {app.fullName}
                        </p>
                        {service && (
                          <p className="text-xs text-muted-foreground truncate">
                            {service.title}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p
                        className={`text-xs font-medium ${
                          isToday ? "text-sky-600" : "text-muted-foreground"
                        }`}
                      >
                        {formatDate(app.date)}
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        <Clock className="size-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          {app.time} hs
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {member && (
                        <span className="text-[11px] text-muted-foreground">
                          con {member.fullName}
                        </span>
                      )}
                    </div>
                    {app.confirmed ? (
                      <Badge
                        variant="outline"
                        className="text-[10px] h-5 bg-emerald-50 text-emerald-700 border-emerald-200"
                      >
                        Confirmado
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-[10px] h-5 bg-amber-50 text-amber-700 border-amber-200"
                      >
                        Pendiente
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
