import { Separator } from "@/components/ui/separator";
import { CustomerTable } from "../components/customers-table";
import { CustomerAside } from "../components/customers-aside";
import { CustoemrsList } from "../components/customers-list";
import { useCustomersQuery } from "@/queries/customers";
import { EmptyList } from "@/components/common/emty-list";
import { useState } from "react";
import { ICustomer } from "@/interfaces/customer.interface";

export function CustomersPage() {
  const { data: customers = [], isLoading } = useCustomersQuery();
  const [asideOpen, setAsideOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | undefined>();

  const handleSelectCustomer = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setAsideOpen(true);
  };

  const handleCloseAside = () => {
    setAsideOpen(false);
    setSelectedCustomer(undefined);
  };
  return (
    <div className="flex flex-col   size-full space-y-4">
      <section className=" flex items-end  justify-between">
        <h2 className="text-xl font-semibold">Clientes</h2>
      </section>
      <Separator />
      <section className="flex flex-grow max-h-[90%]  overflow-auto gap-2 max-md:hidden">
        {isLoading ? (
          <div className="size-full flex justify-center items-center">
            <EmptyList type="customer" />
          </div>
        ) : customers.length === 0 ? (
          <div className="size-full flex justify-center items-center">
            <EmptyList type="customer" />
          </div>
        ) : (
          <section className="h-full flex-grow ">
            <CustomerTable onSelect={handleSelectCustomer} />
          </section>
        )}
      </section>
      <section className="md:hidden">
        {customers.length === 0 ? (
          <div className="size-full flex justify-center items-center">
            <EmptyList type="customer" />
          </div>
        ) : (
          <CustoemrsList customers={customers} onSelect={handleSelectCustomer} />
        )}
      </section>
      <CustomerAside open={asideOpen} customer={selectedCustomer} onClose={handleCloseAside} />
    </div>
  );
}
