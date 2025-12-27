import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppointmentServices } from "@/services/appointment.services";
import { queryKeys } from "./queryKeys";
import { appointmentListAdpater } from "@/adapters/appointments.adpater";
import {
  IAppointment,
  IAppointmentApiResponse,
  ICreateAppointment,
} from "@/interfaces/appointments.interface";
import { IUser } from "@/interfaces";

type AppointmentsResult = {
  appointments: IAppointment[];
  total: number;
  limit: number;
  offset: number;
  page: number;
};

export function useAppointmentsQuery(
  options?: { enabled?: boolean; currentUser?: IUser | null }
) {
  const currentUser = options?.currentUser;
  return useQuery<{
    appointments: IAppointment[];
    total: number;
    limit: number;
    offset: number;
    page: number;
  }>({
    queryKey: queryKeys.appointments.all,
    queryFn: () => AppointmentServices.getAll(),
    select: (data: IAppointmentApiResponse): AppointmentsResult => {
      const filtered =
        currentUser?.role === "BASIC"
          ? data.appointments.filter((app) => app.UserId === currentUser.id)
          : data.appointments;

      return {
        ...data,
        appointments: appointmentListAdpater(filtered),
      };
    },
    enabled: options?.enabled,
  });
}

export function useAppointmentQuery(id?: string, options?: { enabled?: boolean }) {
  return useQuery<IAppointment[]>({
    queryKey: queryKeys.appointments.detail(id || ""),
    queryFn: () => AppointmentServices.getByEmail(id as string),
    enabled: !!id && options?.enabled !== false,
  });
}

export function useCreateAppointmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateAppointment) =>
      AppointmentServices.createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
    },
  });
}

export function useUpdateAppointmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      changes,
    }: {
      id: string;
      changes: Partial<IAppointment>;
    }) => AppointmentServices.update(id, changes),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.detail(id),
      });
    },
  });
}

export function useCancelAppointmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointmentId: string) =>
      AppointmentServices.cancelAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
    },
  });
}

export function useReactivateAppointmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointmentId: string) =>
      AppointmentServices.reactiveAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
    },
  });
}
