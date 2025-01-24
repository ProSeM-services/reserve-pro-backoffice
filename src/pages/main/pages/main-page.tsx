import { RouteAuthorizationWrapper } from "@/components/auth/route-authoriaztion";
import { AppSidebar } from "@/components/common/app-sidebar";
import DataProvider from "@/components/providers/data-provider";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/config/axios.config";
import { IAppointment } from "@/interfaces/appointments.interface";
import { Permission } from "@/lib/constants/permissions";
import { AppointmentPage } from "@/pages/appointments/page/appointment-page";
import { CompanyPage } from "@/pages/company/page/company-page";
import { CustomersPage } from "@/pages/customers/page/customers-page";
import Hero from "@/pages/dashboard/components/hero";
import { DashboardPage } from "@/pages/dashboard/page";
import { MembersPage } from "@/pages/members/page/members-page";
import { ServicesPage } from "@/pages/services/page/services-page";
import { useEffect } from "react";
import { SetHoursPage } from "@/pages/set-hours/pages/set-hours-page";
import { Route, Routes } from "react-router";
import { io } from "socket.io-client";

const socket = io(API_BASE_URL); // URL del backend

export default function MainPage() {
  const { toast } = useToast();
  useEffect(() => {
    socket.on("nuevo-turno", (turno: IAppointment) => {
      console.log("Nuevo turno recibido", turno);
      toast({
        title: "Nuevo Turno 🎉",
        description: `${turno.name} agendó un turno a las ${turno.time}hs`,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="h-full w-full  flex flex-col  overflow-hidden    text-xs ">
      <DataProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-[6vh]   shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <section className="h-10">
                  <Hero />
                </section>
              </div>
            </header>
            <div className="p-4 flex-1   max-h-[93vh] overflow-auto">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route
                  path="/company/*"
                  element={
                    <RouteAuthorizationWrapper
                      permission={Permission.VIEW_COMPANY}
                    >
                      <CompanyPage />
                    </RouteAuthorizationWrapper>
                  }
                />
                <Route
                  path="/members/*"
                  element={
                    <RouteAuthorizationWrapper
                      permission={Permission.VIEW_COMPANY}
                    >
                      <MembersPage />
                    </RouteAuthorizationWrapper>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <RouteAuthorizationWrapper
                      permission={Permission.VIEW_SERVICES}
                    >
                      <ServicesPage />
                    </RouteAuthorizationWrapper>
                  }
                />
                <Route
                  path="/appointment"
                  element={
                    <RouteAuthorizationWrapper
                      permission={Permission.VIEW_APPOINTMENTS}
                    >
                      <AppointmentPage />
                    </RouteAuthorizationWrapper>
                  }
                />
                <Route
                  path="/customers"
                  element={
                    <RouteAuthorizationWrapper
                      permission={Permission.VIEW_CUSTOMERS}
                    >
                      <CustomersPage />
                    </RouteAuthorizationWrapper>
                  }
                />
                <Route
                  path="/set-hours"
                  element={
                    <RouteAuthorizationWrapper
                      permission={Permission.VIEW_WORKHOURS}
                    >
                      <SetHoursPage />
                    </RouteAuthorizationWrapper>
                  }
                />
                <Route path="*" element={<h2> NOT FOUND</h2>} />
              </Routes>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </DataProvider>
    </div>
  );
}
