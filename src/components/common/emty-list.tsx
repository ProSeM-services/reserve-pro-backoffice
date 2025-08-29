import React from "react";
import {
  BadgeDollarSign,
  Building,
  CalendarX,
  HousePlugIcon,
  ListX,
  LucideProps,
  Navigation,
  UserRoundX,
  Users2Icon,
  UserSquare,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";

export function EmptyList({
  type,
}: {
  type:
    | "paymentPlan"
    | "member"
    | "company"
    | "service"
    | "customer"
    | "no-members-to-add"
    | "appointments"
    | "no-services-to-add"
    | "no-incomes";
}) {
  const Config: Record<
    | "member"
    | "paymentPlan"
    | "company"
    | "service"
    | "customer"
    | "no-members-to-add"
    | "appointments"
    | "no-services-to-add"
    | "no-incomes",
    {
      Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
      title: string;
      description: string;
      redirect?: string;
    }
  > = {
    company: {
      title: "Sin sucursales",
      description: "Aún no has creado ninguna sucursal",
      Icon: Building,
      redirect: "/company",
    },
    service: {
      title: "Sin servicios",
      description: "No tienes servicios creados todavía",
      Icon: HousePlugIcon,
    },
    member: {
      title: "Equipo vacío",
      description: "No hay miembros en tu equipo actualmente",
      Icon: Users2Icon,
    },
    appointments: {
      title: "Vacio",
      description: "No hay turnos para mostrar.",
      Icon: CalendarX,
    },
    customer: {
      title: "Sin clientes",
      description: "No tienes clientes creados todavía",
      Icon: UserSquare,
    },
    "no-members-to-add": {
      title: "Equipo vacío",
      description: "",
      Icon: UserRoundX,
      redirect: "/members",
    },
    "no-services-to-add": {
      title: "Lista vacía",
      description: "No hay más servicios en tu empresa para que puedas agregar",
      Icon: ListX,
      redirect: "/services",
    },
    "no-incomes": {
      title: "Vacío",
      description: "No hay turnos confirmados.",
      Icon: BadgeDollarSign,
    },
    paymentPlan: {
      title: "Vacío",
      description: "No hay pagos realizados.",
      Icon: BadgeDollarSign,
    },
  };

  const { title, description, Icon, redirect } = Config[type];
  return (
    <div className=" flex-grow h-64 w-full rounded-lg flex flex-col items-center  justify-center text-center p-6 transition-all duration-300 ">
      <Icon className="size-16 mb-4 text-primary " />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <br />
      {redirect && (
        <Link to={redirect}>
          <Button>
            <Navigation className="size-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
