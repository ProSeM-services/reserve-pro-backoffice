import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "../components/views/stats-views";
import { DashboardWe } from "../components/views/we-view";

export function DashboardPage() {
  return (
    <div className="size-full   ">
      <Tabs defaultValue="stats" className="h-[95%]  ">
        <TabsList>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          <TabsTrigger value="we">Nosotros</TabsTrigger>
        </TabsList>
        <TabsContent value="stats" className="h-full">
          <DashboardStats />
        </TabsContent>
        <TabsContent value="we" className="h-full">
          <DashboardWe />
        </TabsContent>
      </Tabs>
    </div>
  );
}
