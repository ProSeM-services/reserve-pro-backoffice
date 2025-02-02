import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchIcon, XIcon } from "lucide-react";
import { SearchMembers } from "./search-members";
export default function TriggerSearchMembers() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"} className="flex items-center gap-2">
          <span>Buscar</span>
          <SearchIcon className="size-4 " />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <section className=" flex justify-between">
          <SheetHeader>
            <SheetTitle>Invitar nuevo miembro</SheetTitle>
            <SheetDescription>
              Puedes buscar profesionales registrados en <b>Reserve Pro</b> e
              invitarlos a unirse a tu equipo.
            </SheetDescription>
          </SheetHeader>
          <SheetTrigger>
            <XIcon />
          </SheetTrigger>
        </section>

        <div className="flex-grow h-[90%]">
          <SearchMembers />
        </div>
      </SheetContent>
    </Sheet>
  );
}
