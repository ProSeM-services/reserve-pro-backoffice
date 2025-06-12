import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenMemberDetails } from "./open-member-details";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { SendInviteUser } from "./send-invite-user";
import { IUser } from "@/interfaces";
import {
  AlertTriangle,
  BookPlus,
  Building,
  CalendarCheck,
  MailCheck,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/hooks";

interface MemberCardProps {
  member: IUser;
  type?: "details" | "invite" | "read";
}
export function MemberCard({ member, type = "details" }: MemberCardProps) {
  const { inmutableServices } = useAppSelector((s) => s.service);
  const memberService = inmutableServices.filter(
    (service) => service.Users && service.Users?.some((e) => e.id === member.id)
  );
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex gap-4 ">
            <div className=" flex justify-center items-start  ">
              <MemberAvatar member={member} size="md" />
            </div>
            <div className="flex flex-col  items-start flex-grow">
              <div className=" w-full flex  items-center justify-between ">
                <div className="flex items-center gap-2 text-lg max-md:text-[15px] font-semibold ">
                  <p>
                    {member.name}, {member.lastName}
                  </p>
                  {(!member.CompanyId || !memberService.length) && (
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="size-4 text-orange-500" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-orange-200 ">
                        <div className="font-normal flex flex-col gap-2 ">
                          {!member.CompanyId && (
                            <p className="flex items-center gap-1">
                              <Building className="size-4" />
                              Este miembro no se encuntra asignado a niguna
                              sucursal
                            </p>
                          )}
                          {!memberService.length && (
                            <p className="flex items-center gap-1">
                              {" "}
                              <BookPlus className="size-4" />
                              Este miembro no se le asignó ningún servicio
                            </p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                {type === "read" ? null : (
                  <>
                    {type === "details" && (
                      <OpenMemberDetails member={member} />
                    )}
                    {type === "invite" && <SendInviteUser member={member} />}
                  </>
                )}
              </div>
              <div className="bg-indigo-200 text-indigo-500 p-1 px-4 rounded-xl text-xs">
                <p>{member.role}</p>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {type === "details" && <hr className="w-5/6 mx-auto mb-4" />}
      {type === "details" && (
        <CardContent>
          <div className="flex flex-col w-full justify-start text-[14px] gap-4 ">
            <div className="flex items-center gap-2">
              <MailCheck className="size-4" />
              <span className="font-normal">{member.email || ""} </span>
            </div>
            {member.createdAt && (
              <div className="flex items-center gap-2 ">
                <CalendarCheck className="size-4" />
                <span>Fecha de ingreso: </span>
                <span>{new Date(member.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
