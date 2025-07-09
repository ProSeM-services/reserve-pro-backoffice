import { Separator } from "@/components/ui/separator";
import { AddButton } from "@/components/common/add-button";
import AuthorizationWrapper from "@/components/auth/authorization-wrapper";
import { Permission } from "@/lib/constants/permissions";
import { ServicesList } from "../components/services-list";
import { ServiceAside } from "../components/services-aside";

export function ServicesPage() {
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
          <ServicesList />
        </section>
      </section>
      <ServiceAside />
    </div>
  );
}
