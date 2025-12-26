import { Separator } from "@/components/ui/separator";
import { AddButton } from "@/components/common/add-button";
import AuthorizationWrapper from "@/components/auth/authorization-wrapper";
import { Permission } from "@/lib/constants/permissions";
import { ServicesList } from "../components/services-list";
import { ServiceAside } from "../components/services-aside";
import { useState } from "react";
import { IService } from "@/interfaces";

export function ServicesPage() {
  const [asideOpen, setAsideOpen] = useState(false);
  const [asideService, setAsideService] = useState<IService | undefined>();
  const [asideType, setAsideType] = useState<"details" | "add-member" | "edit">(
    "details"
  );

  const handleOpenAside = (
    service: IService,
    type: "details" | "add-member" | "edit"
  ) => {
    setAsideService(service);
    setAsideType(type);
    setAsideOpen(true);
  };

  const handleCloseAside = () => {
    setAsideOpen(false);
    setAsideService(undefined);
  };

  return (
    <div className="flex flex-col   size-full space-y-4">
      <section className=" flex items-end  justify-between">
        <h2 className="text-xl font-semibold">Servicios</h2>
        <div className="flex items-center gap-2">
          <AuthorizationWrapper permission={Permission.CREATE_SERVICES}>
            <AddButton type="services" />
          </AuthorizationWrapper>
        </div>
      </section>
      <Separator />
      <section className="flex flex-grow max-h-[90%]  overflow-auto gap-2">
        <section className="h-full flex-grow ">
          <ServicesList onOpenAside={handleOpenAside} />
        </section>
      </section>
      <ServiceAside
        open={asideOpen}
        service={asideService}
        type={asideType}
        onClose={handleCloseAside}
      />
    </div>
  );
}
