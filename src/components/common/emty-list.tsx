import React from "react";
import {
  BadgeDollarSign,
  Building,
  CalendarX,
  HousePlugIcon,
  ListX,
  LucideProps,
  UserRoundX,
  Users2Icon,
  UserSquare,
} from "lucide-react";

export function EmptyList({
  type,
}: {
  type:
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
    }
  > = {
    company: {
      title: "Sin sucursales",
      description: "Aún no has creado ninguna sucursal",
      Icon: Building,
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
      description: "No hay más miembros en tu equipo para que puedas agregar",
      Icon: UserRoundX,
    },
    "no-services-to-add": {
      title: "Lista vacía",
      description: "No hay más servicios en tu empresa para que puedas agregar",
      Icon: ListX,
    },
    "no-incomes": {
      title: "Vacío",
      description: "No hay turnos confirmados.",
      Icon: BadgeDollarSign,
    },
  };

  const { title, description, Icon } = Config[type];
  return (
    <div className=" flex-grow h-64 w-full rounded-lg flex flex-col items-center justify-center text-center p-6 transition-all duration-300 ">
      <Icon className="size-16 mb-4 text-primary " />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
