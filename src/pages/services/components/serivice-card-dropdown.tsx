import { IService } from "@/interfaces";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import { setAside } from "@/store/feature/services/servicesSlice";
import { DeleteService } from "./delete-service";

export function ServiceCardDropDown({ service }: { service: IService }) {
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{service.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            dispatch(setAside({ open: true, service, type: "add-member" }))
          }
        >
          Agregar Miembro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            dispatch(setAside({ open: true, service, type: "details" }))
          }
        >
          Ver Detalles
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            dispatch(setAside({ open: true, service, type: "edit" }))
          }
        >
          Editar
        </DropdownMenuItem>
        <DeleteService service={service} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
