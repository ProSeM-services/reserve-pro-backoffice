import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AbsencesTable } from "../components/absences-table";

export function AbsencesPage() {
  return (
    <div className="flex flex-col size-full space-y-4">
      <section className="flex items-end justify-between">
        <h2 className="text-xl font-semibold">Ausencias</h2>
      </section>
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Ausencias del equipo</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <AbsencesTable />
        </CardContent>
      </Card>
    </div>
  );
}
