import { useState } from "react";
import { IService } from "@/interfaces";
import AddMembertoServiceAside from "./add-member-aside";
import { ServiceCard } from "./service-card";
import { LoaderSpinner } from "@/components/common/loader-spinner";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "@/components/common/bar-loader";
import { ServicesServices } from "@/services/services.services";
import { MemberCard } from "@/pages/members/components/member-card";
import { Label } from "@/components/ui/label";

export default function ServiceAsideDetails({
  service,
}: {
  service: IService;
}) {
  const [serviceDetails, setServiceDetails] = useState<IService>(service);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const res = await ServicesServices.getById(service.id);
      setServiceDetails(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <LoaderSpinner />
      </div>
    );
  }
  const handleDeleteMember = async (userId: string) => {
    try {
      setDeleting(true);
      await ServicesServices.removeMember({ serviceId: service?.id, userId });
      await fetchServiceData();
    } catch (error) {
      console.log("Error");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <ServiceCard service={serviceDetails} selectable readonly />

      <div className="space-y-2 relative">
        <Label>Miembros</Label>
        {deleting && <BarLoader />}
        {serviceDetails.Users.length
          ? serviceDetails.Users.map((user) => (
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
          : null}
        <div className="">
          <Label>Agregar</Label>
          <AddMembertoServiceAside
            service={serviceDetails}
            fetchServiceData={fetchServiceData}
          />
        </div>
      </div>
    </div>
  );
}
