import { PropsWithChildren, useEffect } from "react";
import { io } from "socket.io-client";
import { useToast } from "../ui/use-toast";
import { API_BASE_URL } from "@/config/axios.config";
import { IAppointment } from "@/interfaces/appointments.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAppointment } from "@/store/feature/appointnments/appointmentsSlice";
import { appointmentAdapter } from "@/adapters/appointments.adpater";
const token = localStorage.getItem("accessToken");
export function NotificationsProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { members } = useAppSelector((state) => state.member);
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
        dispatch(addAppointment(appointmentAdapter({ ...turno, User })));
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
