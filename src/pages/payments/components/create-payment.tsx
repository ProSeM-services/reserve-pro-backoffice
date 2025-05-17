import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreatePaymentForm } from "./create-payment-form";
import { Button } from "@/components/ui/button";
import { FileUp, HandCoins, XIcon } from "lucide-react";

export function CreatePaymentSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center gap-2">
          <p> Cargar pago</p> <FileUp className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className=" flex flex-col  ">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center gap-2">
            <p> Cargar pago</p>
            <HandCoins />
          </SheetTitle>
          <SheetDescription className="text-center max-md:text-xs">
            Completar el siguiente formulario con el monto a pagar y el
            comprobante de pago.
          </SheetDescription>
          <SheetClose className="absolute right-0 top-4 m-4">
            <XIcon />
          </SheetClose>
        </SheetHeader>
        <div className="p-2  flex-grow max-h-[80vh] overflow-auto">
          <CreatePaymentForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
