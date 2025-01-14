import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { MemberForm } from "./forms/crate-member-form";
import { CompanyForm } from "./forms/create-company-form";
import { Button } from "@/components/ui/button";
import { CreateServicesForm } from "./forms/create-service-form";
export type ICreateType = "member" | "company" | "services";
export type Size = "lg" | "sm";

interface AddButtonProps {
  type: ICreateType;
  size?: Size;
}
const config: Record<
  ICreateType,
  { btnText: string; title: string; Content: () => ReactNode }
> = {
  member: {
    btnText: "Agregar miembro",
    title: "Agregar un miembro al equipo",
    Content: MemberForm,
  },
  company: {
    btnText: "Agregar Sucursal",
    title: "Crear una sucursal nueva",
    Content: CompanyForm,
  },
  services: {
    btnText: "Crear servicio",
    title: "Crear servicio",
    Content: CreateServicesForm,
  },
};
export function AddButton({ type, size = "lg" }: AddButtonProps) {
  const { title, Content, btnText } = config[type];
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          size={size === "lg" ? "default" : "icon"}
          variant={"secondary"}
          className={` flex items-center gap-2 ${
            size === "lg" ? " w-full px-4" : "size-8 rounded-full"
          }`}
        >
          {size === "lg" && (
            <p className="max-md:hidden cursor-pointer">{btnText}</p>
          )}
          <PlusIcon className="size-4 " />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex-grow h-[90%]">
          <Content />
        </div>
      </SheetContent>
    </Sheet>
  );
}
