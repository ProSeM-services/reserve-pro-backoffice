import { AppSidebar } from "@/components/common/app-sidebar";
import DataProvider from "@/components/providers/data-provider";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CompanyPage } from "@/pages/company/page/company-page";
import { CustomersPage } from "@/pages/customers/page/customers-page";
import Hero from "@/pages/dashboard/components/hero";
import { DashboardPage } from "@/pages/dashboard/page";
import { MembersPage } from "@/pages/members/page/members-page";
import { Route, Routes } from "react-router";
export default function MainPage() {
  return (
    <div className="h-full w-full  flex flex-col  overflow-hidden    text-xs ">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DataProvider>
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
                <Route path="/company/*" element={<CompanyPage />} />
                <Route path="/members/*" element={<MembersPage />} />
                <Route path="/services" element={<h2> Servicios </h2>} />
                <Route path="/appointment" element={<h2> appointment</h2>} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="*" element={<h2> NOT FOUND</h2>} />
              </Routes>
            </div>
          </DataProvider>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
