import LoaderWrapper from "@/components/common/loader-wrapper";
import { useAppSelector } from "@/store/hooks";
import { ServiceCard } from "./service-card";

export function ServicesList() {
  const { services, loading } = useAppSelector((a) => a.service);

  return (
    <LoaderWrapper loading={loading} type="services">
      <div className="flex max-md:flex-col gap-4 ">
        {services.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
    </LoaderWrapper>
  );
}
