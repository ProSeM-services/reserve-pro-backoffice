import { Separator } from "@/components/ui/separator";
import { MemberList } from "../components/member-list";
import { AddButton } from "@/components/common/add-button";
import TriggerSearchMembers from "../components/trigger-search-members";

export function MembersPage() {
  return (
    <div className="flex flex-col   size-full space-y-4">
      <section className=" flex items-end  justify-between">
        <h2 className="text-xl font-semibold">Miembros</h2>
        <div className="flex items-center gap-2">
          <TriggerSearchMembers />
          <AddButton type="member" />
        </div>
      </section>
      <Separator />
      <section className="flex flex-grow max-h-[90%]  overflow-auto gap-2">
        <section className="h-full flex-grow ">
          <MemberList />
        </section>
      </section>
    </div>
  );
}
