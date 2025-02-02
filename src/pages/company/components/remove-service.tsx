import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ICompany, IService } from "@/interfaces";
import { CircleMinus } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ServicesServices } from "@/services/services.services";
/* Component to handle the action to remove one service from company */
export function RemoveService({
  service,
  company,
}: {
  service: IService;
  company: ICompany;
}) {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const handleDeleteFromCompany = async () => {
    setDeleting(true);
    try {
      await ServicesServices.removeFromCompany({
        companyId: company.id,
        serviceId: service.id,
      });
      toast({
        title: `${service.title},  elminado de ${company.name}`,
      });
    } catch (error) {
      toast({
        title: `Hubo un error al eilinar a ${service.title} de ${company.name}`,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="p-0 size-7"
      onClick={handleDeleteFromCompany}
      isLoading={deleting}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CircleMinus className="size-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Remover a {service.title} de {company.name}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Button>
  );
}
