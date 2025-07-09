import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { HandPlatter } from "lucide-react";

export function ServiceCell({
  serviceId,
  icon = true,
}: {
  serviceId: string;
  icon?: boolean;
}) {
  const { services } = useAppSelector((s) => s.service);
  const service = services.find((s) => s.id === serviceId);
  return (
    <div className="h-10 flex items-center gap-2    ">
      {icon && <HandPlatter className="size-8" />}
      <div className="flex flex-col">
        <Label>{service?.title}</Label>
        <span className="text-sm text-gray-600">$ {service?.price}</span>
      </div>
    </div>
  );
}
