import { Label } from "@/components/ui/label";
import { CompanyLinks } from "@/pages/company/components";
import { MemberList } from "@/pages/members/components/member-list";

export function DashboardPage() {
  return (
    <div className="h-full w-full  flex flex-col gap-4    text-xs ">
      <Label>Miembros</Label>
      <MemberList />

      <hr />
      <Label>Sucursales</Label>

      <CompanyLinks />
    </div>
  );
}
