import { ICompany } from "@/interfaces";
import { RemoveMember } from "./remove-member";
import { Users2Icon } from "lucide-react";

export async function CompnayMemberList({ company }: { company: ICompany }) {
  const members = company.Users;
  return (
    <div>
      {members?.length ? (
        <div>
          {members.map((member) => (
            <div className="flex items-center gap-2" key={member.id}>
              <RemoveMember member={member} company={company} />
              {member.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 bg-background border border-accent    h-52 w-full rounded-md  items-center justify-center    ">
          <Users2Icon className="size-10" />
          <p className="font-light text-sm w-60  text-center">
            No tenes miembros cargados en este equipo.
          </p>
        </div>
      )}
    </div>
  );
}
