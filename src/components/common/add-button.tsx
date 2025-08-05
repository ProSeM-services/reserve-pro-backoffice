import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlertOctagonIcon, PlusIcon, XIcon } from "lucide-react";
import { MemberForm } from "./forms/crate-member-form";
import { CompanyForm } from "./forms/create-company-form";
import { Button } from "@/components/ui/button";
import { CreateServicesForm } from "./forms/create-service-form";
import { useAppSelector } from "@/store/hooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const { enterprise } = useAppSelector((s) => s.enterprise);
  const { paymentsPlans } = useAppSelector((s) => s.paymentsPlans);
  const { companies } = useAppSelector((s) => s.company);

  const ableToCreateCompany = (): boolean => {
    if (type !== "company") return true;

    const paymentPlan = paymentsPlans.filter(
      (p) => p.id === enterprise.payment_plan
    )[0];
    if (!paymentPlan) {
      //SI NO TIENE PLAN SOLAMENTE SE PUEDE SI NO TIENE COMPANIES!
      return companies.length === 0;
    }
    return paymentPlan.company_limit > companies.length;
  };
  const message = "Tu plan seleccionado no te permite crear nuevas sucursales.";
  if (!ableToCreateCompany())
    return (
      <Popover>
        <PopoverTrigger>
          {" "}
          <Button
            disabled={!ableToCreateCompany()}
            size={size === "lg" ? "default" : "icon"}
            className={` flex items-center gap-2 ${
              size === "lg" ? " w-full px-4" : "size-8 rounded-full"
            }`}
          >
            {size === "lg" && (
              <p className="max-md:hidden cursor-pointer">{btnText}</p>
            )}
            <PlusIcon className="size-4 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex text-sm gap-2 text-gray-700">
          <AlertOctagonIcon />
          <p>{message}</p>
        </PopoverContent>
      </Popover>
    );
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          size={size === "lg" ? "default" : "icon"}
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
        <section className=" flex justify-between">
          <SheetTitle>{title}</SheetTitle>
          <SheetTrigger>
            <XIcon />
          </SheetTrigger>
        </section>

        <div className="flex-grow h-[90%]">
          <Content />
        </div>
      </SheetContent>
    </Sheet>
  );
}
