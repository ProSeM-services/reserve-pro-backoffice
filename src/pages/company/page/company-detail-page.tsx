import { CategoryCard } from "@/components/common/category-card";
import { NeedReladcompanyPage } from "../components/need-reload-company";
import { EditCompany } from "../components/edit-company";
import {
  AddToCompany,
  CompnayMemberList,
  CompnayServicesList,
  DeleteCompany,
} from "../components";
import { MapComponent } from "@/components/common/map";
import { useAppSelector } from "@/store/hooks";
import { PaymentCard } from "@/components/common/payment-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AddImageCompany } from "../components/add-image-company";
import { CompanyImages } from "../components/company-images";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
export function CompanyDetailPage() {
  const { selectedCompany, companies } = useAppSelector((s) => s.company);
  const company = companies.find((comp) => comp.id === selectedCompany);
  const { toast } = useToast();
  if (!company) return;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_NEXT_PUBLIC_URL}/booking?company=${company.id}`
      );
      // setCopied(true);
      // setTimeout(() => setCopied(false), 2000); // Reset el estado después de 2s
      toast({
        title: "Link copiado",
      });
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };
  return (
    <div className="flex flex-col gap-4 md:flex-grow relative p-4  max-md:max-w-full ">
      <div className="flex max-md:flex-col  gap-2 md:items-center justify-between  ">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex  gap-2">
              <AddImageCompany company={company} key={company.id} />
              <div className="flex flex-col items-star gap-2  ">
                <p className="text-lg font-semibold ">{company?.name}</p>
                <div className="text-gray-500 space-y-1">
                  <p>{company.address.value}</p>
                  <p>{company.email}</p>
                  <Button
                    onClick={handleCopy}
                    variant={"secondary"}
                    className="flex items-center gap-2"
                  >
                    <LinkIcon className="size-4" />
                    Web para agendar turnos
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <NeedReladcompanyPage />
        </div>

        <div className="flex items-center gap-2">
          <EditCompany company={company} />
          <DeleteCompany company={company} />
        </div>
      </div>
      <Separator />
      {/* ---------------------------- CATEGORY SECTION ---------------------------- */}
      <Label>Categorías</Label>
      <div className="flex gap-2">
        {company.category.map((cat) => (
          <CategoryCard key={cat} category={cat} selected={false} />
        ))}
      </div>
      {/* ---------------------------- PAYMENT METHODS SECTION ---------------------------- */}
      <Label>Métodos de pago</Label>
      <div className="flex  gap-2 max-md:gap-1  max-md:flex-wrap">
        {company.payment_methods?.map((method) => (
          <PaymentCard key={method} paymentMethod={method} selected={false} />
        ))}
      </div>

      {/* ---------------------------- MAP SECTION ---------------------------- */}
      <div className="min-h-[40dvh] h-[40dvh]  w-full  ">
        {company.address.lat && company.address.lng ? (
          <MapComponent lat={company.address.lat} lng={company.address.lng} />
        ) : null}
      </div>
      <Separator />

      {/* ---------------------------- MEMBER SECTION ---------------------------- */}
      <section className="">
        <div className="flex  justify-between p-2">
          <div className="font-semibold">
            <Label>Miembros</Label>
            <span className="text-gray-400 text-sm">
              {" "}
              ({company.Users?.length}){" "}
            </span>
          </div>
          <AddToCompany company={company} type="member" />
        </div>
        <CompnayMemberList company={company} />
      </section>
      {/* ---------------------------- SERVICES SECTION ---------------------------- */}

      <section className="">
        <div className="flex  justify-between p-2">
          <div className="font-semibold">
            <Label>Servicios</Label>
            <span className="text-gray-400 text-sm">
              {" "}
              ({company.Services?.length}){" "}
            </span>
          </div>
          <AddToCompany company={company} type="service" />
        </div>
        <CompnayServicesList company={company} />
      </section>

      {/* ---------------------------- WORKHOURS SECTION ---------------------------- */}
      <section className="max-md:w-[90%]">
        <CompanyImages company={company} />
      </section>
    </div>
  );
}
