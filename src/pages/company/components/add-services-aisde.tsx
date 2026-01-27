import { useState } from "react";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ICompany } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { BarLoader } from "@/components/common/bar-loader";
import { ServiceCard } from "@/pages/services/components/service-card";
import { EmptyList } from "@/components/common/emty-list";
import { useServicesQuery, useAddServiceToCompanyMutation } from "@/queries/services";

export function AddServicesAside({ company }: { company: ICompany }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Added state for loading

  const { data: services = [], isLoading: servicesLoading } = useServicesQuery();
  const addServiceToCompanyMutation = useAddServiceToCompanyMutation();
  const { toast } = useToast();
  const handleSelectService = (memberId: string) => {
    let res = [];
    if (selectedServices.includes(memberId)) {
      res = selectedServices.filter((e) => e !== memberId);
    } else {
      res = [...selectedServices, memberId];
    }

    setSelectedServices(res);
  };

  const handleAddServices = async () => {
    setLoading(true); // Set loading to true when adding services
    try {
      await Promise.all(
        selectedServices.map((serviceId) =>
          addServiceToCompanyMutation.mutateAsync({
            companyId: company.id,
            serviceId,
          })
        )
      );
      toast({
        title: "Servicios cargados!",
        description: `Los servicios fueron agregados exitosamente a ${company.name}!`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error en la carga!",
        description: `Hubo un error al agregar los miembors en ${company.name}!`,
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Set loading to false after adding services
    }
  };
  if (!company.id) return null;

  const servicesToShow = services.filter(
    (s) => !company.Services?.some((value) => value.id === s.id)
  );
  return (
    <div className="space-y-2 h-full max-h-full overflow-auto  ">
      {servicesLoading ? (
        <BarLoader />
      ) : servicesToShow.length === 0 ? (
        <EmptyList type="no-services-to-add" />
      ) : (
        <div>
          {loading && <BarLoader />}
          <div className="flex flex-col gap-2 text-xs">
            {servicesToShow?.map((service) => (
              <div
                className={`flex relative items-center gap-2 border rounded-md border-accent  cursor-pointer hover:bg-secondary transition-all duration-150 ${
                  selectedServices.includes(service.id!)
                    ? "border border-primary "
                    : ""
                }`}
                key={service.id}
                onClick={() => handleSelectService(service.id!)}
              >
                <ServiceCard service={service} readonly selectable />

                {selectedServices.includes(service.id!) && (
                  <CheckCircleIcon className="text-primary absolute right-2 bottom-2  size-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-1 right-1  ">
        <Button
          onClick={handleAddServices}
          disabled={selectedServices.length === 0 || loading} // Disable button if loading
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}
