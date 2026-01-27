import { PropsWithChildren, useEffect } from "react";
import { io } from "socket.io-client";
import { useToast } from "../ui/use-toast";
import { API_BASE_URL } from "@/config/axios.config";
import { IAppointment } from "@/interfaces/appointments.interface";
import { useQueryClient } from "@tanstack/react-query";
import { appointmentAdapter } from "@/adapters/appointments.adpater";
import { queryKeys } from "@/queries/queryKeys";
import { useMembersQuery } from "@/queries/members";
const token = localStorage.getItem("accessToken");
export function NotificationsProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const { data: members = [] } = useMembersQuery({ enabled: !!token });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!token) return;
    const socket = io(API_BASE_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("nuevo-turno", (turno: IAppointment) => {
      const User = members.find((member) => member.id === turno.UserId);
      if (User) {
        queryClient.setQueryData(queryKeys.appointments.all, (prev: any) => {
          if (!prev?.appointments) {
            return { appointments: [appointmentAdapter({ ...turno, User })] };
          }
          return {
            ...prev,
            appointments: [
              appointmentAdapter({ ...turno, User }),
              ...prev.appointments,
            ],
          };
        });
      }

      toast({
        title: "Nuevo Turno 🎉",
        description: `${turno.name} agendó un turno a las ${turno.time}hs`,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return <>{children}</>;
}
