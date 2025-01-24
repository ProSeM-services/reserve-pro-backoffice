import { Separator } from "@/components/ui/separator";
import { CustomerTable } from "../components/customers-table";
import { CustomerAside } from "../components/customers-aside";

export function CustomersPage() {
  return (
    <div className="flex flex-col   size-full space-y-4">
      <section className=" flex items-end  justify-between">
        <h2 className="text-xl font-semibold">Clientes</h2>
        <div className="flex items-center gap-2">buscar</div>
      </section>
      <Separator />
      <section className="flex flex-grow max-h-[90%]  overflow-auto gap-2">
        <section className="h-full flex-grow ">
          <CustomerTable />
        </section>
      </section>
      <CustomerAside />
    </div>
  );
}
