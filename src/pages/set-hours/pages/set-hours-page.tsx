import { WorkhoursEditor } from "@/components/common/forms/wh-editor";
import useSession from "@/hooks/useSession";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { MemberCard } from "@/pages/members/components/member-card";
import { hasPermission } from "@/lib/auth/has-permission";
import { Permission } from "@/lib/constants/permissions";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUser } from "@/interfaces";
import { EmptyList } from "@/components/common/emty-list";
import { WorkHourCalendar } from "@/components/common/work-hour-calendar";
import { useMembersQuery } from "@/queries/members";
import { useCompaniesQuery } from "@/queries/companies";
import { ICompany } from "@/interfaces/company.interface";

export function SetHoursPage() {
  const { member } = useSession();
  const { data: members = [] } = useMembersQuery();
  const { data: companies = [] } = useCompaniesQuery();
  const [selectedMember, setSelectedMember] = useState<IUser | undefined>(
    member
  );
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);

  useEffect(() => {
    if (companies.length) {
      setSelectedCompany(companies[0]);
    }
  }, [companies]);

  if (!member) return null;

  if (members.length === 0 && companies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <EmptyList type="no-members-to-add" />
        No hay sucursales o miembros
      </div>
    );
  }

  const handleSelectMember = (id: string) => {
    const selectedMember = members.find((e) => e.id === id);
    if (selectedMember) setSelectedMember(selectedMember);
  };

  const handleSelectCompany = (id: string) => {
    const selectedCompany = companies.find((b) => b.id === id);
    if (selectedCompany) setSelectedCompany(selectedCompany);
  };

  return (
    <Tabs defaultValue="members" className="  ">
      {(member.role === "OWNER" || member.role === "ADMIN") && (
        <TabsList>
          {members.length > 0 && (
            <TabsTrigger value="members">Miembros</TabsTrigger>
          )}
          {companies.length > 0 && (
            <TabsTrigger value="company">Sucursales</TabsTrigger>
          )}
        </TabsList>
      )}
      <TabsContent value="members" className="flex flex-col gap-2 h-[90%] ">
        <div className="flex items-center gap-4">
          {!hasPermission(member, Permission.UPDATE_WORKHOURS) &&
          member.role !== "OWNER" &&
          member.role !== "ADMIN" ? (
            selectedMember && <MemberCard member={selectedMember} type="read" />
          ) : (
            <Select
              value={selectedMember?.id}
              onValueChange={(value) => handleSelectMember(value)}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Inicio" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem value={member.id} key={member.id} className="">
                    <div className="flex items-center gap-4 p-1">
                      <MemberAvatar member={member} size="xs" />
                      <p>{member.fullName}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {selectedMember && (
            <WorkhoursEditor
              id={selectedMember.id}
              type={"member"}
              workhours={selectedMember.workhours}
            />
          )}
        </div>
        <section className=" flex-grow   ">
          <WorkHourCalendar
            workhours={selectedMember?.workhours || []}
          />
        </section>
      </TabsContent>
      {companies.length && selectedCompany && (
        <TabsContent
          value="company"
          className="flex flex-col gap-2 h-[90%] -mt-1"
        >
          <div className="flex items-center gap-4">
            <Select
              value={selectedCompany.id}
              onValueChange={handleSelectCompany}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una sucursal" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((s) => (
                  <SelectItem value={s.id} key={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <WorkhoursEditor
              id={selectedCompany.id}
              type="company"
              workhours={selectedCompany.workhours}
            />
          </div>
          <section className="flex-grow ">
            <WorkHourCalendar workhours={selectedCompany.workhours || []} />
          </section>
        </TabsContent>
      )}
    </Tabs>
  );
}
