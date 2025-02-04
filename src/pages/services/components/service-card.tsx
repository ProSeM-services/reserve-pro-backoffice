import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICompany, IService } from "@/interfaces";
import { ServiceCardDropDown } from "./serivice-card-dropdown";
import { formatCurrency } from "@/lib/utils/format-currency";

interface ServiceCardProps {
  service: IService;
  readonly?: boolean;
  selectedCompany?: ICompany;
  selectable?: boolean;
}

export const ServiceCard = ({
  service,
  readonly = false,
}: ServiceCardProps) => {
  return (
    <Card
      className={`flex flex-col items-start justify-between w-1/3 min-w-[50px]  gap-1  p-4 rounded-sm shadow-sm lg:flex-grow    bg-background max-lg:w-full  `}
    >
      <section className="flex justify-between w-full">
        <div className="space-y-2">
          <p className="font-semibold text-lg uppercase">{service.title}</p>

          <div className="flex gap-2 items-center text-xs">
            <p className=" rounded-md px-3  flex items-center bg-soft-c text-white font-semibold  ">
              {service.duration}min
            </p>
            <p className=" rounded-md px-3  flex items-center bg-soft-c text-white font-semibold  ">
              {service.provision}
            </p>
          </div>
        </div>
        {!readonly && <ServiceCardDropDown service={service} />}
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
        <p className="font-semibold">{formatCurrency(service.price)}</p>
      </div>
    </Card>
  );
};
