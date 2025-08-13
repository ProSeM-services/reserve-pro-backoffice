import { useState } from "react";
import { IService } from "@/interfaces";
import AddMembertoServiceAside from "./add-member-aside";
import { ServiceCard } from "./service-card";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "@/components/common/bar-loader";
import { MemberCard } from "@/pages/members/components/member-card";
import { Label } from "@/components/ui/label";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import { EmptyList } from "@/components/common/emty-list";

export default function ServiceAsideDetails({
  service,
}: {
  service: IService;
}) {
  const [deleting, setDeleting] = useState(false);
  const { removeMemberFromService } = useCreatingFetch();
  const handleDeleteMember = async (userId: string) => {
    try {
      setDeleting(true);
      await removeMemberFromService(userId, service.id);
    } catch (error) {
      console.log("Error");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <ServiceCard service={service} selectable readonly />

      <div className="space-y-2 relative">
        {deleting && <BarLoader />}
        <Label>Miembros</Label>
        {service.Users.length ? (
          service.Users.map((user) => (
            <div className="flex items-center gap-2  w-full" key={user.id}>
              <Button
                disabled={deleting}
                size={"icon"}
                variant={"ghost"}
                className="size-8"
                onClick={() => handleDeleteMember(user.id)}
              >
                <TrashIcon className="size-3" />
              </Button>
              <MemberCard member={user} type="read" />
            </div>
          ))
        ) : (
          <EmptyList type="no-members-to-add" />
        )}
        <div className="">
          <Label>Agregar Miembros a este servicio</Label>
          <AddMembertoServiceAside service={service} />
        </div>
      </div>
    </div>
  );
}
