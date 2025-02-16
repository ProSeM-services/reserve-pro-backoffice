import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import ServiceAsideDetails from "./service-aside-details";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { XIcon } from "lucide-react";
import { closeAside } from "@/store/feature/services/servicesSlice";
import AddMembertoServiceAside from "./add-member-aside";
import { EditServicesForm } from "./aside/edit-service-form";

export function ServiceAside() {
  const { asideOpen, asideService, asideType } = useAppSelector(
    (s) => s.service
  );
  const dispatch = useAppDispatch();
  return (
    <Sheet open={asideOpen}>
      <SheetContent>
        <div
          className="absolute right-6 cursor-pointer "
          onClick={() => dispatch(closeAside())}
        >
          <XIcon className="size-4" />
        </div>
        <SheetTitle>
          {asideType === "details" && "Detalles del Servicio"}
          {asideType === "add-member" && "Agregar Miembros"}
          {asideType === "edit" && "Editar Servicio"}
        </SheetTitle>
        <hr />
        <div className="flex-grow h-[95%] max-h-[95%] overflow-auto space-y-3 ">
          {asideService && asideType === "details" && (
            <ServiceAsideDetails service={asideService} />
          )}
          {asideService && asideType === "add-member" && (
            <AddMembertoServiceAside service={asideService} />
          )}
          {asideService && asideType === "edit" && <EditServicesForm />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
