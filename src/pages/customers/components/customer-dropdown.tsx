import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICustomer } from "@/interfaces/customer.interface";
import { EllipsisVertical } from "lucide-react";

export function CustomerDropDown({
  customer,
  onSelect,
}: {
  customer: ICustomer;
  onSelect?: (customer: ICustomer) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="text-gray-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{customer.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onSelect?.(customer)}
        >
          Perfil
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Contactar</DropdownMenuItem>
        <DropdownMenuItem>Aplicar Descuento</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
