import { RouteAuthorizationWrapper } from "@/components/auth/route-authoriaztion";
import { AppSidebar } from "@/components/common/app-sidebar";
import { NotificationsProvider } from "@/components/notifications/notifications-provider";
import DataProvider from "@/components/providers/data-provider";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Permission } from "@/lib/constants/permissions";
import { AppointmentPage } from "@/pages/appointments/page/appointment-page";
import { CompanyPage } from "@/pages/company/page/company-page";
import { CustomersPage } from "@/pages/customers/page/customers-page";
import Hero from "@/pages/dashboard/components/hero";
import { DashboardPage } from "@/pages/dashboard/page";
import { MembersPage } from "@/pages/members/page/members-page";
import { ServicesPage } from "@/pages/services/page/services-page";
import { SetHoursPage } from "@/pages/set-hours/pages/set-hours-page";
import { Route, Routes } from "react-router";
import { ContentWrapper } from "../components/content-wrapper";
import { CalendarPage } from "@/pages/calendar/page/calendar-page";
import { SessionProvider } from "@/components/providers/session-provider";
import { PaymentPage } from "@/pages/payments/page/payment-page";
import { SettingsPage } from "@/pages/settings/page/settings-page";

export default function MainPage() {
  return (
    <div className="h-full w-full  flex flex-col  overflow-hidden    text-xs ">
      <SessionProvider>
        <DataProvider>
          <NotificationsProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-[6vh]   shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
                  <div className="flex items-center gap-2 px-4  w-full">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <section className="h-10 flex-grow">
                      <Hero />
                    </section>
                  </div>
                </header>
                <ContentWrapper>
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
                    <Route
                      path="/calendar"
                      element={
                        <RouteAuthorizationWrapper
                          permission={Permission.VIEW_APPOINTMENTS}
                        >
                          <CalendarPage />
                        </RouteAuthorizationWrapper>
                      }
                    />
                    <Route
                      path="/payments"
                      element={
                        <RouteAuthorizationWrapper
                          permission={Permission.VIEW_APPOINTMENTS}
                        >
                          <PaymentPage />
                        </RouteAuthorizationWrapper>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <RouteAuthorizationWrapper
                          permission={Permission.VIEW_APPOINTMENTS}
                        >
                          <SettingsPage />
                        </RouteAuthorizationWrapper>
                      }
                    />
                    <Route path="*" element={<h2> NOT FOUND</h2>} />
                  </Routes>
                </ContentWrapper>
              </SidebarInset>
            </SidebarProvider>
          </NotificationsProvider>
        </DataProvider>
      </SessionProvider>
    </div>
  );
}
