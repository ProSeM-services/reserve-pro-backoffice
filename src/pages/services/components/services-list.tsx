import LoaderWrapper from "@/components/common/loader-wrapper";
import { useAppSelector } from "@/store/hooks";
import { ServiceCard } from "./service-card";
import { EmptyList } from "@/components/common/emty-list";

export function ServicesList() {
  const { services, loading } = useAppSelector((a) => a.service);

  return (
    <LoaderWrapper loading={loading} type="services">
      {services.length > 0 ? (
        <div className="max-md:flex max-md:flex-col gap-4 flex-wrap grid grid-cols-3 max-lg:grid-cols-2 ">
          {services.map((service) => (
            <div className=" flex   w-full  " key={service.id}>
              <ServiceCard service={service} key={service.id} showMembers />
            </div>
          ))}
        </div>
      ) : (
        <div className="size-full flex justify-center items-center">
          <EmptyList type={"service"} />
        </div>
      )}
    </LoaderWrapper>
  );
}
