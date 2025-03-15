import LoaderWrapper from "@/components/common/loader-wrapper";
import { useAppSelector } from "@/store/hooks";
import { ServiceCard } from "./service-card";
import { EmptyList } from "@/components/common/emty-list";

export function ServicesList() {
  const { services, loading } = useAppSelector((a) => a.service);

  return (
    <LoaderWrapper loading={loading} type="services">
      {services.length > 0 ? (
        <div className="flex max-md:flex-col gap-4 flex-wrap ">
          {services.map((service) => (
            <div className=" w-1/3 min-w-[50px]   lg:flex-grow    max-lg:w-full">
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
