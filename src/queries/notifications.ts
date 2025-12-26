import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationServices } from "@/services/notification.service";
import { queryKeys } from "./queryKeys";
import { INotification } from "@/interfaces/notifications.interface";

export function useNotificationsQuery(options?: { enabled?: boolean }) {
  return useQuery<INotification[]>({
    queryKey: queryKeys.notifications.all,
    queryFn: () => NotificationServices.getAllNotifications({ read: false }),
    ...options,
  });
}

export function useUpdateNotificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      changes,
    }: {
      id: string;
      changes: Partial<INotification>;
    }) => NotificationServices.update({ id, data: changes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
}
