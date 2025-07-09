import { useAppSelector } from "@/store/hooks";

export function ServiceDetail({ serviceId }: { serviceId: string }) {
  const { inmutableServices } = useAppSelector((s) => s.service);

  const service = inmutableServices.find((s) => s.id === serviceId);
  if (!service) return;
  return (
    <div className="flex gap-2 w-full">
      <div className="flex gap-2 items-center font-medium">
        <p className=" text-xs   px-3 uppercase   truncate rounded-sm  max-md:w-20  w-20 text-left   bg-orange-200 text-orange-700 ">
          {service.title}
        </p>
        <p className=" rounded-md px-3  flex items-center  bg-orange-200 text-orange-700   ">
          {service.duration}min
        </p>
      </div>
    </div>
  );
}
