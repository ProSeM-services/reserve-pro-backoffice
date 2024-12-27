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
interface AddButtonProps {
  type: ICreateType;
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
export function AddButton({ type }: AddButtonProps) {
  const { title, Content } = config[type];
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          size={"icon"}
          variant={"secondary"}
          className=" rounded-full size-8 "
        >
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
