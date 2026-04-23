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
import { DeleteService } from "./delete-service";
import { useServiceAside } from "../context/aside.context";

export function ServiceCardDropDown({ service }: { service: IService }) {
  const { openAside } = useServiceAside();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{service.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => openAside(service, "details")}>
          Agregar Miembro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openAside(service, "edit")}>
          Editar
        </DropdownMenuItem>
        <DeleteService service={service} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
