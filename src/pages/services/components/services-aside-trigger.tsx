import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IService } from "@/interfaces";
import ServiceAsideDetails from "./service-aside-details";

export function ServiceAsideTrigger({ service }: { service: IService }) {
  return (
    <Sheet>
      <SheetTrigger>Ver Detalles</SheetTrigger>
      <SheetContent>
        <SheetTitle>Detalles del servicio</SheetTitle>
        <hr />
        <div className="flex-grow h-[85%] space-y-3">
          <ServiceAsideDetails service={service} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
