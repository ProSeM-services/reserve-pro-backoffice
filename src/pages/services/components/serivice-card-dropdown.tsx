import { IService } from "@/interfaces";
import { EllipsisIcon } from "lucide-react";
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

export function ServiceCardDropDown({ service }: { service: IService }) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisIcon />
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
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
