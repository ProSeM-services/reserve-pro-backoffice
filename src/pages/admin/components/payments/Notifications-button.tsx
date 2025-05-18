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
import { Badge } from "@/components/ui/badge";

export function NotificationsButton() {
  const { notifications } = useAppSelector((s) => s.notifications);

  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <Button variant="ghost" className="relative p-2">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {notifications.length}
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

        <div className="flex flex-col gap-3 mt-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start justify-between p-4 bg-muted rounded-lg shadow-sm border"
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Eliminar notificación"
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
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
