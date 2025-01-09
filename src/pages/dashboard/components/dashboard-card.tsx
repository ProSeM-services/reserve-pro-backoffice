import { AddButton } from "@/components/common/add-button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { UserIcon } from "lucide-react";

type Type = "member" | "company" | "services";
interface IConfig {
  label: string;
  count: number;
  Component: () => JSX.Element;
}

interface DashboardCardProps {
  type: Type;
}
export function DashboardCard({ type }: DashboardCardProps) {
  const { members } = useAppSelector((s) => s.member);
  const { companies } = useAppSelector((s) => s.company);
  const { services } = useAppSelector((s) => s.service);
  const Config: Record<Type, IConfig> = {
    services: {
      label: "Servicios",
      count: services.length,
      Component: () => (
        <>
          {services.map((service) => (
            <div key={service.id} className="flex gap-2 items-start ">
              <div>
                <UserIcon />
              </div>

              <div>
                <Label>{service.title}</Label>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </>
      ),
    },
    member: {
      label: "Miembros",
      count: members.length,
      Component: () => (
        <>
          {members.map((member) => (
            <div key={member.id} className="flex gap-2 items-start ">
              <div>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={`${member.name} asd`}
                    className="size-10 aspect-square object-cover rounded-full"
                  />
                ) : (
                  <UserIcon />
                )}
              </div>

              <div>
                <Label>{member.fullName}</Label>
                <p className="text-gray-600">{member.email}</p>
              </div>
            </div>
          ))}
        </>
      ),
    },
    company: {
      label: "Sucursales",
      count: companies.length,
      Component: () => (
        <>
          {companies.map((company) => (
            <div key={company.id} className="flex gap-2 items-start ">
              <div>asd</div>

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

  const { Component, label, count } = Config[type];
  return (
    <Card className="flex flex-col  w-[30%] max-sm:w-full  max-sm:max-w-full flex-grow max-md:max-w-[50%] md:max-w-[33%]  min-w-[250px] h-1/2 p-2 gap-2 ">
      <section className="   flex flex-col  gap-4 ">
        <div className="flex flex-col items-center ">
          <Label className="text-3xl">{count}</Label>
          <p>{label}</p>
        </div>

        <AddButton type={type} />
      </section>
      <section className=" space-y-2 flex-grow  h-full max-h-full overflow-auto">
        <Component />
      </section>
    </Card>
  );
}
