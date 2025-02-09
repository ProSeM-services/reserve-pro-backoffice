import { Label } from "@/components/ui/label";
import { FromatedDate } from "@/lib/format-date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeftFromLine, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setAside } from "@/store/feature/customers/customerSlice";

export function CustoemrsList() {
  const { customers } = useAppSelector((s) => s.customers);
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-2 flex-col w-full">
      {customers.map((customer) => (
        <Accordion type="single" collapsible key={customer.id}>
          <AccordionItem value={customer.id} className="w-full">
            <AccordionTrigger>
              <div className=" flex items-center gap-2 ">
                <User2Icon />
                <section className=" text-left">
                  <Label className="text-lg">{customer.fullName}</Label>
                  <div className="flex gap-1  text-gray-500">
                    <span>desde el </span>
                    <span className="font-medium">
                      <FromatedDate date={customer.createdAt} />
                    </span>
                  </div>
                </section>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <section className="text-[15px] flex items-center justify-between">
                <p className=" flex items-center gap-2 bg-muted px-2 rounded-md h-8 ">
                  <b>{customer.appointments?.length} </b> Turnos agendados
                </p>
                <Button
                  variant={"secondary"}
                  onClick={() =>
                    dispatch(
                      setAside({
                        open: true,
                        customer: customer,
                        type: "details",
                      })
                    )
                  }
                >
                  <ArrowLeftFromLine className="size-4" />
                </Button>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
