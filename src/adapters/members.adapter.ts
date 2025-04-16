import { IAPIMember } from "@/interfaces/api/member.iterface";
import { IMember } from "@/interfaces/member.iterface";

export function memberAdpater(member: IAPIMember): IMember {
  return {
    companyName: member?.companyName,
    email: member.email,
    id: member.id,
    lastName: member.lastName,
    name: member.name,
    fullName: `${member.name} ${member.lastName}`,
    password: member.password,
    role: member.role,
    userName: member.userName,
    CompanyId: member.CompanyId,
    createdAt: member.createdAt,
    image: member.image,
    permissions: member.permissions,
    phone: member.phone,
    workhours: member.workhours,
    membership_status: member.membership_status,
    EnterpriseId: member.EnterpriseId,
  };
}
export function memberListAdpater(members: IAPIMember[]): IMember[] {
  return members.map((member) => memberAdpater(member));
}
