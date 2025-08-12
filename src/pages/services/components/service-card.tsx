import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICompany, IService } from "@/interfaces";
import { ServiceCardDropDown } from "./serivice-card-dropdown";
import { formatCurrency } from "@/lib/utils/format-currency";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { TriangleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/hooks";
interface ServiceCardProps {
  service: IService;
  readonly?: boolean;
  selectedCompany?: ICompany;
  selectable?: boolean;
  showMembers?: boolean;
}

export const ServiceCard = ({
  service,
  readonly = false,
  showMembers = false,
}: ServiceCardProps) => {
  const { inmutablesCompanies } = useAppSelector((s) => s.company);

  const servicesCompanies = inmutablesCompanies.filter((s) =>
    s.Services?.some((s) => s.id === service.id)
  );
  return (
    <Card className="w-full ">
      <CardHeader>
        <div className="flex justify-between w-full items-center  ">
          <CardTitle className="flex items-center gap-2">
            {service.title}

            {!servicesCompanies.length && (
              <Tooltip>
                <TooltipTrigger>
                  <TriangleAlert className="size-5 text-orange-600" />
                </TooltipTrigger>
                <TooltipContent className=" bg-orange-200">
                  <p>Este servicio no está asignadoa ninguna sucursal</p>
                </TooltipContent>
              </Tooltip>
            )}
          </CardTitle>

          {!readonly && <ServiceCardDropDown service={service} />}
        </div>
      </CardHeader>
      <hr className="w-5/6 mx-auto" />
      <CardContent className="py-4">
        <section className="space-y-2">
          <p className=" text-lg">{formatCurrency(service.price)}</p>
          <div className="flex gap-2">
            <p className=" rounded-md px-3 py-1  flex items-center bg-blue-200 text-blue-500   ">
              {service.duration}min
            </p>
            <p className=" rounded-md px-3 py-1  flex items-center bg-indigo-200 text-indigo-500  ">
              {service.provision}
            </p>
          </div>
          {!readonly && (
            <div className="">
              <p className="text-gray-500 font-light">
                {service.description ? (
                  service.description
                ) : (
                  <i>No hay descripción del serivcio</i>
                )}
              </p>
            </div>
          )}

          {showMembers && (!service.Users || !service.Users.length) && (
            <Tooltip>
              <TooltipTrigger>
                <TriangleAlert className="size-5 text-orange-600" />
              </TooltipTrigger>
              <TooltipContent className=" bg-orange-200">
                <p>
                  No tienes profesionales (miembros) asignados a este servicio
                </p>
              </TooltipContent>
            </Tooltip>
          )}
          {showMembers && service.Users && (
            <div className="flex">
              {service.Users.map((user) => (
                <div
                  className="flex items-center gap-2 -ml-2  rounded-full "
                  key={user.id}
                >
                  <MemberAvatar member={user} size="xs" className="border" />
                </div>
              ))}
            </div>
          )}
        </section>
      </CardContent>
    </Card>
  );
};
