import { ICompany } from "@/interfaces";
import { ServiceCard } from "@/pages/services/components/service-card";

import { AxeIcon } from "lucide-react";
import { RemoveService } from "./remove-service";

export function CompnayServicesList({ company }: { company: ICompany }) {
  const services = company.Services;

  return (
    <div>
      {services?.length ? (
        <div className="flex flex-col gap-2">
          {services.map((service) => (
            <div className="flex items-center gap-2" key={service.id}>
              <RemoveService company={company} service={service} />
              <ServiceCard service={service} readonly />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 bg-background border border-accent    h-52 w-full rounded-md  items-center justify-center    ">
          <AxeIcon className="size-10" />
          <p className="font-light text-sm w-60  text-center">
            No tienes servicios cargadados en esta sucursal.
          </p>
        </div>
      )}
    </div>
  );
}
