import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import ServiceAsideDetails from "./service-aside-details";
import { XIcon } from "lucide-react";
import AddMembertoServiceAside from "./add-member-aside";
import { EditServicesForm } from "./aside/edit-service-form";
import { IService } from "@/interfaces";

export function ServiceAside({
  open,
  service,
  type,
  onClose,
}: {
  open: boolean;
  service?: IService;
  type: "details" | "add-member" | "edit";
  onClose: () => void;
}) {
  return (
    <Sheet open={open}>
      <SheetContent>
        <div className="absolute right-6 cursor-pointer " onClick={onClose}>
          <XIcon className="size-4" />
        </div>
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
