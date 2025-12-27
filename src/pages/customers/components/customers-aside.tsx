import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { XIcon } from "lucide-react";
import { CustomerDetails } from "./customers-details";
import { ICustomer } from "@/interfaces/customer.interface";

export function CustomerAside({
  open,
  customer,
  onClose,
}: {
  open: boolean;
  customer?: ICustomer;
  onClose: () => void;
}) {
  return (
    <Sheet open={open}>
      <SheetContent>
        <div className="absolute right-6 cursor-pointer " onClick={onClose}>
          <XIcon className="size-4" />
        </div>
        <SheetTitle>{open && "Detalles del Cliente"}</SheetTitle>
        <hr />
        <div className="flex-grow h-[95%]  space-y-3">
          {customer && <CustomerDetails customer={customer} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
