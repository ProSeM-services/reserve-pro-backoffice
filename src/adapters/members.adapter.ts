import { IUser } from "@/interfaces";
import { IAPIUser } from "@/interfaces/api";

export function memberAdpater(member: IAPIUser): IUser {
  return {
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
    companyName: member.companyName,
    membership_status: member.membership_status,
    EnterpriseId: member.EnterpriseId,
  };
}
export function memberListAdpater(members: IAPIUser[]): IUser[] {
  return members.map((member) => memberAdpater(member));
}
