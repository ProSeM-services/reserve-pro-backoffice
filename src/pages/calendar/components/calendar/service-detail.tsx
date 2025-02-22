import { useAppSelector } from "@/store/hooks";

export function ServiceDetail({ serviceId }: { serviceId: string }) {
  const { inmutableServices } = useAppSelector((s) => s.service);

  const service = inmutableServices.find((s) => s.id === serviceId);
  if (!service) return;
  return (
    <div className="flex gap-2 w-full">
      <div className="flex gap-2 items-center font-medium">
        <p className=" text-xs text-white  px-3 uppercase  bg-primary/70 truncate rounded-sm  max-md:w-20  w-20 text-left   ">
          {service.title}
        </p>
        <p className=" rounded-md px-3  flex items-center bg-primary/70 text-white   ">
          {service.duration}min
        </p>
        <p className=" rounded-md px-3  flex items-center bg-primary/70 text-white  ">
          {service.provision}
        </p>
      </div>
    </div>
  );
}
