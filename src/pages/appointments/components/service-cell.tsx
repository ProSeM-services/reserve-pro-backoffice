import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { HandPlatter } from "lucide-react";

export function ServiceCell({ serviceId }: { serviceId: string }) {
  const { services } = useAppSelector((s) => s.service);
  const service = services.find((s) => s.id === serviceId);
  return (
    <div className="h-10 flex items-center gap-2  ">
      <HandPlatter className="size-8" />
      <div className="flex flex-col">
        <Label>{service?.title}</Label>
        <span className="text-sm text-gray-600">$ {service?.price}</span>
      </div>
    </div>
  );
}
