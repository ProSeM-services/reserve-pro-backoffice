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
import { IMember } from "@/interfaces/member.iterface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function SetHoursPage() {
  const { members } = useAppSelector((s) => s.member);
  const { companies } = useAppSelector((s) => s.company);
  const { member } = useSession();
  const [selectedMember, setSelectedMember] = useState<IMember>(member);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  if (!member) return;

  const handleSelectMember = (id: string) => {
    const selectedMember = members.filter((e) => e.id === id)[0];
    setSelectedMember(selectedMember);
  };

  const handleSelectCompany = (id: string) => {
    const selectedCompany = companies.filter((b) => b.id === id)[0];
    if (selectedCompany) setSelectedCompany(selectedCompany);
  };
  return (
    <Tabs defaultValue="members" className="  ">
      <TabsList>
        <TabsTrigger value="members">Miembros</TabsTrigger>
        <TabsTrigger value="company">Sucursales</TabsTrigger>
      </TabsList>
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
        <section className=" flex-grow  ">
          <WorkhoursEditor
            id={selectedMember.id}
            type={"member"}
            workhours={selectedMember.workhours}
          />
        </section>
      </TabsContent>
      <TabsContent
        value="company"
        className="flex flex-col gap-2 h-[90%] -mt-1"
      >
        <Select value={selectedCompany.id} onValueChange={handleSelectCompany}>
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
    </Tabs>
  );
}
