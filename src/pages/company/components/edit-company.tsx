import { ICompany } from "@/interfaces";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PenIcon, XIcon } from "lucide-react";

import { UpdateCompanyForm } from "./update-company-form";

export function EditCompany({ company }: { company: ICompany }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"} className="flex items-center gap-2">
          <span className="max-md:hidden"> Editar</span>
          <PenIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <section className=" flex justify-between">
          <SheetTitle className="flex items-center gap-1 ">
            <PenIcon className="size-4" /> <span>{company.name}</span>
          </SheetTitle>
          <SheetTrigger>
            <XIcon />
          </SheetTrigger>
        </section>

        <div className="flex-grow h-[90%]">
          <UpdateCompanyForm company={company} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
