import AuthorizationWrapper from "@/components/auth/authorization-wrapper";
import { AddButton } from "@/components/common/add-button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Permission } from "@/lib/constants/permissions";
import { FromatedDate } from "@/lib/format-date";
import { MemberCard } from "@/pages/members/components/member-card";
import { ServiceCard } from "@/pages/services/components/service-card";
import { useAppSelector } from "@/store/hooks";
import { HouseIcon, UserIcon } from "lucide-react";

type Type = "member" | "company" | "services" | "appointments";
interface IConfig {
  label: string;
  count: number;
  permission: Permission;
  Component: () => JSX.Element;
}

interface DashboardCardProps {
  type: Type;
}
export function DashboardCard({ type }: DashboardCardProps) {
  const { members } = useAppSelector((s) => s.member);
  const { companies } = useAppSelector((s) => s.company);
  const { services } = useAppSelector((s) => s.service);
  const { appointments } = useAppSelector((s) => s.appointments);

  const Config: Record<Type, IConfig> = {
    appointments: {
      label: "Turnos",
      count: appointments.length,
      permission: Permission.VIEW_APPOINTMENTS,
      Component: () => (
        <>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex  flex-col gap-2 items-start "
            >
              <div className="flex items-start gap-2">
                <UserIcon className="size-8" />
                <div className="flex flex-col items-start ">
                  <p className="flex gap-2 items-center">
                    <Label>{appointment.fullName}</Label>
                    <FromatedDate date={appointment.date} />
                  </p>
                  <p className="font-medium text-gray-500">
                    {appointment.User.fullName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ),
    },
    services: {
      label: "Servicios",
      count: services.length,
      permission: Permission.CREATE_SERVICES,
      Component: () => (
        <div className="">
          {services.map((service) => (
            <ServiceCard service={service} key={service.id} readonly />
          ))}
        </div>
      ),
    },
    member: {
      label: "Miembros",
      count: members.length,
      permission: Permission.CREATE_MEMBERS,
      Component: () => (
        <div className="">
          {members.map((member) => (
            <MemberCard member={member} key={member.id} type="read" />
          ))}
        </div>
      ),
    },
    company: {
      label: "Sucursales",
      count: companies.length,
      permission: Permission.CREATE_COMPANY,
      Component: () => (
        <>
          {companies.map((company) => (
            <div key={company.id} className="flex gap-2 items-start ">
              <div>
                <HouseIcon />
              </div>

              <div>
                <Label>{company.name}</Label>
                <p className="text-gray-600">{company.email}</p>
              </div>
            </div>
          ))}
        </>
      ),
    },
  };

  const { Component, label, count, permission } = Config[type];
  return (
    <Card className="flex flex-col   p-2 gap-2  max-sm:w-full  max-sm:max-w-full flex-grow max-md:max-w-[50%] md:max-w-[33%]  min-w-[250px] relative  h-full max-h-[70vh] ">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>Total de {label} creados</CardDescription>
      </CardHeader>

      <section className="   flex flex-col  gap-4 relative  ">
        <div className="flex flex-col items-center ">
          <Label className="text-4xl">{count}</Label>
        </div>
      </section>
      <section className=" space-y-2 flex-grow  h-[100%] max-h-[100%] overflow-auto ">
        <Component />
      </section>

      <div className="absolute right-0 top-0 m-4 ">
        {type !== "appointments" && (
          <AuthorizationWrapper permission={permission}>
            <AddButton type={type} size="sm" />
          </AuthorizationWrapper>
        )}
      </div>
    </Card>
  );
}
