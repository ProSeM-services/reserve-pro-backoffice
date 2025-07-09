import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Bell, XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NotificationCard } from "./notification-card";
import { useState } from "react";

export function NotificationsButton() {
  const { notifications } = useAppSelector((s) => s.notifications);

  const [allNotifications, setShowAllNotifications] = useState(false);
  const notReadNotifications = notifications.filter((n) => !n.read);

  const notificationsToShow = allNotifications
    ? notifications
    : notReadNotifications;
  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <Button variant="ghost" className="relative p-2">
          <Bell className="w-5 h-5" />
          {notReadNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {notReadNotifications.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bell />
            <p>Notificaciones</p>
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Estas son las notificaciones más recientes de tu cuenta.
          </SheetDescription>

          <SheetClose className="absolute right-4 top-4">
            <XIcon />
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col gap-3 mt-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-2 ">
          <div className="flex gap-2">
            <Button
              variant={allNotifications ? "default" : "secondary"}
              onClick={() => setShowAllNotifications(true)}
            >
              Todos
            </Button>
            <Button
              variant={!allNotifications ? "default" : "secondary"}
              onClick={() => setShowAllNotifications(false)}
            >
              No Leidos
            </Button>
          </div>
          {notificationsToShow.length > 0 ? (
            notificationsToShow.map((notification) => (
              <NotificationCard
                notification={notification}
                key={notification.id}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No hay notificaciones
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
