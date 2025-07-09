import { Separator } from "@/components/ui/separator";
import { CustomerTable } from "../components/customers-table";
import { CustomerAside } from "../components/customers-aside";
import { CustoemrsList } from "../components/customers-list";
import { useAppSelector } from "@/store/hooks";
import { EmptyList } from "@/components/common/emty-list";

export function CustomersPage() {
  const { customers } = useAppSelector((s) => s.customers);
  return (
    <div className="flex flex-col   size-full space-y-4">
      <section className=" flex items-end  justify-between">
        <h2 className="text-xl font-semibold">Clientes</h2>
      </section>
      <Separator />
      <section className="flex flex-grow max-h-[90%]  overflow-auto gap-2 max-md:hidden">
        {customers.length === 0 ? (
          <div className="size-full flex justify-center items-center">
            <EmptyList type="customer" />
          </div>
        ) : (
          <section className="h-full flex-grow ">
            <CustomerTable />
          </section>
        )}
      </section>
      <section className="md:hidden">
        {customers.length === 0 ? (
          <div className="size-full flex justify-center items-center">
            <EmptyList type="customer" />
          </div>
        ) : (
          <CustoemrsList />
        )}
        <CustoemrsList />
      </section>
      <CustomerAside />
    </div>
  );
}
