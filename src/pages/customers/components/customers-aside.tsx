import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { XIcon } from "lucide-react";
import { closeAside } from "@/store/feature/customers/customerSlice";
import { CustomerDetails } from "./customers-details";

export function CustomerAside() {
  const { asideOpen, asideCustomer, asideType } = useAppSelector(
    (s) => s.customers
  );
  const dispatch = useAppDispatch();
  console.log({ asideOpen, asideCustomer, asideType });
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
          {asideType === "details" && "Detalles del Cliente"}
        </SheetTitle>
        <hr />
        <div className="flex-grow h-[95%]  space-y-3">
          {asideCustomer && asideType === "details" && (
            <CustomerDetails customer={asideCustomer} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
