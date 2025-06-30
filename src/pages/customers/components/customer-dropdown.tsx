import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICustomer } from "@/interfaces/customer.interface";
import { setAside } from "@/store/feature/customers/customerSlice";
import { useAppDispatch } from "@/store/hooks";
import { EllipsisVertical } from "lucide-react";

export function CustomerDropDown({ customer }: { customer: ICustomer }) {
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="text-gray-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{customer.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            dispatch(
              setAside({ open: true, customer: customer, type: "details" })
            )
          }
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
