import { Separator } from "@/components/ui/separator";
import { MemberList } from "../components/member-list";
import { Input } from "@/components/ui/input";
import { AddButton } from "@/components/common/add-button";

export function MembersPage() {
  return (
    <div className="   size-full space-y-4">
      <section className=" flex items-center justify-between">
        <div>
          <Input placeholder="Buscar" />
        </div>

        <AddButton type="member" />
      </section>
      <Separator />
      <MemberList />
    </div>
  );
}
