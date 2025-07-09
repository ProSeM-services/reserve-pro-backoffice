import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IService } from "@/interfaces";
import AddMembertoServiceAside from "./add-member-aside";

export default function AddMemberToService({ service }: { service: IService }) {
  return (
    <Sheet>
      <SheetTrigger>Agregar Miembro</SheetTrigger>
      <SheetContent>
        <SheetTitle>
          Agregar profesional al serivcio: {service.title}
        </SheetTitle>
        <div className="flex-grow h-[85%] space-y-3">
          <p className=" text-foreground/80 text-sm space-x-1">
            Los miembros de este servicio son los encargados de llevar el mismo
            adelante con los clientes.
          </p>
          <hr />
          <AddMembertoServiceAside service={service} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
