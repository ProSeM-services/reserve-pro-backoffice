import { useAppDispatch } from "@/store/hooks";
import { CompanySelector } from "./company-selector";
import { MemberSelector } from "./member-selector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setAppointmentsFilterDate } from "@/store/feature/appointnments/appointmentsSlice";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthorizationWrapper from "@/components/auth/authorization-wrapper";
import { Permission } from "@/lib/constants/permissions";

function Filters() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex max-md:flex-col  gap-4 ">
      <div className="w-[300px] max-md:w-full">
        <MemberSelector />
      </div>
      <AuthorizationWrapper permission={Permission.VIEW_COMPANY}>
        <div className="w-[300px] max-md:w-full">
          <CompanySelector />
        </div>
      </AuthorizationWrapper>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => dispatch(setAppointmentsFilterDate("all"))}
          >
            Ver Todos los turnos
          </TabsTrigger>
          <TabsTrigger
            value="today"
            onClick={() => dispatch(setAppointmentsFilterDate("today"))}
          >
            Ver turnos de Hoy
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
export function AppointmentsFilter() {
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Button variant={"secondary"}>
              <FilterIcon className="text-gray-600 size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <SheetTitle>Filtrar turnos</SheetTitle>
              <Separator />
              <Filters />
            </div>
            <section className="w-full flex justify-end">
              <SheetTrigger>
                <Button variant={"secondary"}>Aplicar</Button>
              </SheetTrigger>
            </section>
          </SheetContent>
        </Sheet>
      </div>
      <div className="max-md:hidden">
        <Filters />
      </div>
    </>
  );
}
