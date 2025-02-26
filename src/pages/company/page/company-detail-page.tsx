import { Clock2Icon, HomeIcon } from "lucide-react";
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
import WorkhourList from "@/components/common/work-hour-list";
import { useAppSelector } from "@/store/hooks";
import { PaymentCard } from "@/components/common/payment-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AddImageCompany } from "../components/add-image-company";
export function CompanyDetailPage() {
  const { selectedCompany, companies } = useAppSelector((s) => s.company);
  const company = companies.find((comp) => comp.id === selectedCompany);
  if (!company) return;
  const images = typeof company.image === "string" ? [company.image] : company.image ?? [];

  return (
    <div className="flex flex-col gap-4 md:flex-grow relative p-4  max-md:max-w-full ">
      <div className="flex max-md:flex-col  gap-2 md:items-center justify-between  ">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <HomeIcon className="size-5" />
              <p className="text-lg font-semibold ">{company?.name}</p>
            </div>

            <div className="flex items-center gap-2  ">
              <p>{company.address.value}</p>
            </div>
            <p>{company.email}</p>
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
      <div className="h-[40vh] w-full  ">
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
        <Label>Horarios</Label>
        {company.workhours?.length ? (
          <WorkhourList worhHours={company.workhours} />
        ) : (
          <div className="flex flex-col gap-2  border border-accent    h-52 w-full rounded-md  items-center justify-center    ">
            <Clock2Icon className="size-10" />
            <p className="font-light text-sm w-60  text-center">
              No tienes horarios definidos para esta sucursal.
            </p>
          </div>
        )}
      </section>

      {/* ---------------------------- IMAGES SECTION ---------------------------- */}
      <section className="">
        <div className="flex  justify-between p-2">
          <div className="font-semibold">
            <Label>Imagenes</Label>
            <span className="text-gray-400 text-sm">
              {" "}
              ({images.length}){" "}
            </span>
          </div>
        </div>
        <AddImageCompany company={company} key={company.id} />
      </section>

    </div>
  );
}
