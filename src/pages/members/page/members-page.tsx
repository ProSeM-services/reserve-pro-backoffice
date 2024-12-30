import { Separator } from "@/components/ui/separator";
import { MemberList } from "../components/member-list";
import { AddButton } from "@/components/common/add-button";
import { SearchMembers } from "../components/search-members";

export function MembersPage() {
  return (
    <div className="flex flex-col   size-full space-y-4">
      <section className=" flex items-end  justify-between">
        <h2 className="text-xl font-semibold">Miembros</h2>
        <AddButton type="member" />
      </section>
      <Separator />
      <section className="flex flex-grow max-h-[90%]  overflow-auto gap-2">
        <section className="h-full flex-grow ">
          <MemberList />
        </section>
        <section className="h-full w-1/3">
          <SearchMembers />
        </section>
      </section>
    </div>
  );
}
