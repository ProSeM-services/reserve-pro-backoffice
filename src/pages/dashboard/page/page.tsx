import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "../components/views/stats-views";
import { DashboardWe } from "../components/views/we-view";
import useSession from "@/hooks/useSession";

export function DashboardPage() {
  const { member } = useSession();
  return (
    <div className="size-full   ">
      <Tabs defaultValue="stats" className=" h-[80vh] ">
        {member.role !== "BASIC" && (
          <TabsList>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="we">Nosotros</TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="stats" className="h-full ">
          <DashboardStats />
        </TabsContent>
        <TabsContent value="we" className=" ">
          <DashboardWe />
        </TabsContent>
      </Tabs>
    </div>
  );
}
