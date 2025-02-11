import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddMemberAside } from "./add-member-aside";
import { PlusIcon, XIcon } from "lucide-react";
import { ICompany } from "@/interfaces";
import { AddServicesAside } from "./add-services-aisde";
interface AddToCompanyProps {
  company: ICompany;
  type: "member" | "service";
}

type IConfig = {
  title: string;
  description: string;
  sheetTile: string;
  Component: () => ReactNode;
};

export function AddToCompany({ company, type }: AddToCompanyProps) {
  const Confg: Record<"member" | "service", IConfig> = {
    member: {
      title: "   Agregar Miembros",
      sheetTile: "Miembros",
      description: " Elegir mimebros para la sucursal",
      Component: () => <AddMemberAside company={company} />,
    },
    service: {
      title: "   Agregar Servicio",
      sheetTile: "Servicios",
      description: " Elegir servicios para la sucursal",
      Component: () => <AddServicesAside company={company} />,
    },
  };

  const { Component, description, title } = Confg[type];
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-secondary text-primary hover:bg-sky-100 transition-all duration-150 p-1 px-4 rounded-md flex items-center text-xs font-semibold gap-2 ">
          {title}
          <PlusIcon className="size-4 " />
        </div>
      </SheetTrigger>
      <SheetContent>
        <section className=" flex justify-between">
          <SheetTitle>{title}</SheetTitle>
          <SheetTrigger>
            <XIcon />
          </SheetTrigger>
        </section>
        <div className="flex-grow h-[85%] space-y-3">
          <p className=" text-foreground/80 text-sm space-x-1">
            {description}
            <span className="font-medium"> {company.name} </span>
          </p>
          <hr />
          <Component />
        </div>
      </SheetContent>
    </Sheet>
  );
}
