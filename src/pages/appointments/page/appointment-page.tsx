import { Separator } from "@/components/ui/separator";
import { AppointmentsTable } from "../components/appointments-table";


export function AppointmentPage() {
    return (
        <div className="flex flex-col   size-full space-y-4">
            <section className=" flex items-end  justify-between">
                <h2 className="text-xl font-semibold">Turnos</h2>
                <div className="flex items-center gap-2">
                    {/*Posible boton para agregar turnos */}
                </div>
            </section>
            <Separator />
            <section className="flex flex-grow max-h-[90%]  overflow-auto gap-2">
                <section className="h-full flex-grow ">
                    <AppointmentsTable />
                </section>
            </section>
        </div >
    )
}