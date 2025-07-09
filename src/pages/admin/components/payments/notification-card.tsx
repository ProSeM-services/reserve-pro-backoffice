import { LoaderSpinner } from "@/components/common/loader-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INotification } from "@/interfaces/notifications.interface";
import { NotificationServices } from "@/services/notification.service";
import { updateNotification } from "@/store/feature/notifications/notificationsSlice";
import { useAppDispatch } from "@/store/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface NotificationCardProps {
  notification: INotification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const handleReadNotification = async () => {
    try {
      setLoading(true);

      await NotificationServices.update({
        id: notification.id,
        data: {
          read: true,
        },
      });

      dispatch(
        updateNotification({
          id: notification.id,
          changes: {
            ...notification,
            read: true,
          },
        })
      );
    } catch (error) {
      console.log("Error updating notificaction : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={notification.id}
      className={`flex items-start justify-between p-4 ${
        notification.read ? "bg-white" : "bg-muted"
      } rounded-lg shadow-sm border`}
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold">{notification.title}</p>
        <p className="text-sm text-muted-foreground leading-snug">
          {notification.message}
        </p>
        <Badge variant={"outline"} className="m-0">
          {notification.type}
        </Badge>
      </div>

      <div className="flex items-center">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>

        {!notification.read && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive "
                  aria-label="Eliminar notificación"
                  onClick={handleReadNotification}
                  isLoading={loading}
                >
                  {loading ? (
                    <LoaderSpinner />
                  ) : (
                    <div className="bg-blue-500 rounded-full size-[15px] aspect-square" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Marcar como leido</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
