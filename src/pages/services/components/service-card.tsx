import { Card } from "@/components/ui/card";
import { ICompany, IService } from "@/interfaces";
import { ServiceCardDropDown } from "./serivice-card-dropdown";
import { formatCurrency } from "@/lib/utils/format-currency";
import { MemberAvatar } from "@/components/common/members/member-avatar";

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
  return (
    <Card
      className={`flex flex-col items-start justify-between w-full h-full min-w-[50px]  gap-1  p-4 rounded-sm shadow-sm lg:flex-grow    bg-background max-lg:w-full   `}
    >
      <section className="flex justify-between w-full items-center ">
        <div className="flex gap-2 justify-between w-full">
          <p className="  uppercase">{service.title}</p>

          <div className="flex gap-2 items-center text-[10px]">
            <p className=" rounded-md px-3  flex items-center bg-primary text-white   ">
              {service.duration}min
            </p>
            <p className=" rounded-md px-3  flex items-center bg-primary text-white  ">
              {service.provision}
            </p>
          </div>
        </div>
        {!readonly && <ServiceCardDropDown service={service} />}
      </section>
      <div className="flex items-center justify-between">
        <p className="font-bold text-[14px]">{formatCurrency(service.price)}</p>
      </div>
      <p className="text-gray-500 font-light">
        {service.description ? (
          service.description
        ) : (
          <i>No hay descripción del serivcio</i>
        )}
      </p>

      {showMembers && (
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
    </Card>
  );
};
