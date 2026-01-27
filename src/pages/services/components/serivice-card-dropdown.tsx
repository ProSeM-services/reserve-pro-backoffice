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

export function ServiceCardDropDown({
  service,
  onOpenAside,
}: {
  service: IService;
  onOpenAside?: (
    service: IService,
    type: "details" | "add-member" | "edit"
  ) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{service.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onOpenAside?.(service, "details")}
        >
          Agregar Miembro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpenAside?.(service, "edit")}
        >
          Editar
        </DropdownMenuItem>
        <DeleteService service={service} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
