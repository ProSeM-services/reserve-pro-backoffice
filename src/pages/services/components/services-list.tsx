import LoaderWrapper from "@/components/common/loader-wrapper";
import { useAppSelector } from "@/store/hooks";
import { ServiceCard } from "./service-card";

export function ServicesList() {
  const { services, loading } = useAppSelector((a) => a.service);

  return (
    <LoaderWrapper loading={loading} type="services">
      <div className="flex max-md:flex-col gap-4 flex-wrap ">
        {services.map((service) => (
          <div className=" w-1/3 min-w-[50px]   lg:flex-grow    max-lg:w-full">
            <ServiceCard service={service} key={service.id} />
          </div>
        ))}
      </div>
    </LoaderWrapper>
  );
}
