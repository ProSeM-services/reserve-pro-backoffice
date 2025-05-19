import { WorkhoursEditor } from "@/components/common/forms/wh-editor";
import useSession from "@/hooks/useSession";
import { useAppSelector } from "@/store/hooks";
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
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUser } from "@/interfaces";
import { EmptyList } from "@/components/common/emty-list";
export function SetHoursPage() {
  const { members } = useAppSelector((s) => s.member);
  const { companies } = useAppSelector((s) => s.company);
  const { member } = useSession();
  const [selectedMember, setSelectedMember] = useState<IUser>(member);
  const [selectedCompany, setSelectedCompany] = useState(
    companies.length ? companies[0] : null
  );

  if (!member) return;

  const handleSelectMember = (id: string) => {
    const selectedMember = members.filter((e) => e.id === id)[0];
    setSelectedMember(selectedMember);
  };

  const handleSelectCompany = (id: string) => {
    const selectedCompany = companies.filter((b) => b.id === id)[0];
    if (selectedCompany) setSelectedCompany(selectedCompany);
  };

  if (members.length === 0 && companies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <EmptyList type="no-members-to-add" />
        No hay sucursales o miembros
      </div>
    );
  }

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
        {!hasPermission(member, Permission.UPDATE_WORKHOURS) &&
        member.role !== "OWNER" &&
        member.role !== "ADMIN" ? (
          <MemberCard member={selectedMember} type="read" />
        ) : (
          <Select
            value={selectedMember.id}
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
        <section className=" flex-grow   ">
          <WorkhoursEditor
            id={selectedMember.id}
            type={"member"}
            workhours={selectedMember.workhours}
          />
        </section>
      </TabsContent>
      {companies.length && selectedCompany && (
        <TabsContent
          value="company"
          className="flex flex-col gap-2 h-[90%] -mt-1"
        >
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
          <section className="flex-grow ">
            <WorkhoursEditor
              id={selectedCompany.id}
              type="company"
              workhours={selectedCompany.workhours}
            />
          </section>
        </TabsContent>
      )}
    </Tabs>
  );
}
