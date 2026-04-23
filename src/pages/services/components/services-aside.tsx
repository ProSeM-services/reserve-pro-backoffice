import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import ServiceAsideDetails from "./service-aside-details";
import AddMembertoServiceAside from "./add-member-aside";
import { EditServicesForm } from "./aside/edit-service-form";
import { useServiceAside } from "../context/aside.context";

export function ServiceAside() {
  const { open, service, type, closeAside } = useServiceAside();

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && closeAside()}>
      <SheetContent>
        <SheetTitle>
          {type === "details" && "Detalles del Servicio"}
          {type === "add-member" && "Agregar Miembros"}
          {type === "edit" && "Editar Servicio"}
        </SheetTitle>
        <hr />
        <div className="flex-grow h-[95%] max-h-[95%] overflow-auto space-y-3 ">
          {service && type === "details" && (
            <ServiceAsideDetails service={service} />
          )}
          {service && type === "add-member" && (
            <AddMembertoServiceAside service={service} />
          )}
          {service && type === "edit" && <EditServicesForm service={service} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
