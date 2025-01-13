import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FromatedDate } from "@/lib/format-date";
import { useAppSelector } from "@/store/hooks";

export function CustoemrsList() {
  const { customers } = useAppSelector((s) => s.customers);
  return (
    <div className="flex gap-2">
      {customers.map((customer) => (
        <Card className="space-y-1 p-2 w-[250px] rounded-none">
          <section className="">
            <Label>{customer.fullName}</Label>
            <div className="flex gap-2 text-gray-500">
              <span>desde</span>{" "}
              <span className="font-medium">
                <FromatedDate date={customer.createdAt} />
              </span>
            </div>
          </section>
          <Separator />
          <section>
            <p className="text-gray-500">{customer.email}</p>
            <p className="text-gray-500">{customer.phone}</p>
            <p className="text-gray-500">
              Turnos agendados: <b>{customer.appointments?.length} </b>
            </p>
          </section>
        </Card>
      ))}
    </div>
  );
}
