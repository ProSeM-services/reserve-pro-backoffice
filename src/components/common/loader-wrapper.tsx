import { Fragment, PropsWithChildren } from "react";
import {
  HomeIcon,
  CalendarCheck,
  HotelIcon,
  PackageCheck,
  Contact,
  UserSearch,
  CircleDollarSignIcon,
} from "lucide-react";
import { BarLoader } from "./bar-loader";
export type ILoadingWrapper =
  | "company"
  | "members"
  | "services"
  | "customers"
  | "appointments"
  | "payments";
interface LoaderWrapperProps extends PropsWithChildren {
  type: ILoadingWrapper;
  loading: boolean;
}
interface IConfig {
  icon: typeof HomeIcon;
  text: string;
}
const Config: Record<ILoadingWrapper, IConfig> = {
  appointments: {
    icon: CalendarCheck,
    text: "clientes",
  },
  company: {
    icon: HotelIcon,
    text: "sucursales",
  },
  customers: {
    icon: Contact,
    text: "clientes",
  },
  members: {
    icon: UserSearch,
    text: "miembros",
  },
  services: {
    icon: PackageCheck,
    text: "servicios",
  },
  payments: {
    icon: CircleDollarSignIcon,
    text: "Pagos",
  },
};

export default function LoaderWrapper({
  type,
  loading,
  children,
}: LoaderWrapperProps) {
  const { text, icon: Icon } = Config[type];
  if (loading)
    return (
      <div className="relative h-full ">
        <BarLoader />
        <div className=" p-10 h-full w-full flex flex-col gap-4 justify-center items-center ">
          <Icon className="size-10" />
          Cargando {text} ...
        </div>
      </div>
    );

  return <Fragment>{children}</Fragment>;
}
