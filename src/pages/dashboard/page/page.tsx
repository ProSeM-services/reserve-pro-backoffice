import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "../components/views/stats-views";
import { DashboardWe } from "../components/views/we-view";
import useSession from "@/hooks/useSession";

export function DashboardPage() {
  const { member } = useSession();
  return (
    <div className="md:size-full max-md:w-full   ">
      <Tabs defaultValue="stats" className=" md:h-[80vh] ">
        <div>
          {member.role !== "BASIC" && (
            <TabsList>
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
              <TabsTrigger value="we">Nosotros</TabsTrigger>
            </TabsList>
          )}
        </div>
        <TabsContent value="stats" className="h-full  ">
          <DashboardStats />
        </TabsContent>
        <TabsContent value="we" className=" ">
          <DashboardWe />
        </TabsContent>
      </Tabs>
    </div>
  );
}
