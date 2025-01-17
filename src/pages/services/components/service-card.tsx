import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICompany, IService } from "@/interfaces";
import { ServiceCardDropDown } from "./serivice-card-dropdown";

interface ServiceCardProps {
  service: IService;
  readonly?: boolean;
  selectedCompany?: ICompany;
  selectable?: boolean;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card
      className={`flex flex-col items-start justify-between w-full  gap-1  p-4 rounded-sm shadow-sm lg:flex-grow    bg-background max-lg:w-full  `}
    >
      <section className="flex justify-between w-full">
        <div className="space-y-2">
          <p className="font-semibold">{service.title}</p>

          <div className="flex gap-2 items-center text-xs">
            <p className=" rounded-md px-3  flex items-center bg-soft-c text-white font-semibold  ">
              {service.duration}min
            </p>
            <p className=" rounded-md px-3  flex items-center bg-soft-c text-white font-semibold  ">
              {service.provision}
            </p>
          </div>
        </div>
        <ServiceCardDropDown service={service} />
      </section>

      <Separator />

      <p className="text-gray-500 font-light">
        {service.description ? (
          service.description
        ) : (
          <i>No hay descripción del serivcio</i>
        )}
      </p>
      <div className="flex items-center justify-between">
        <p className="font-semibold">${service.price}</p>
      </div>
    </Card>
  );
};
