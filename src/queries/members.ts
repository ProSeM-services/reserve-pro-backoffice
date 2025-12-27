import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MemberServices } from "@/services/member.services";
import { queryKeys } from "./queryKeys";
import { IAddMember, ICreateUser, IUser } from "@/interfaces";
import { memberAdpater, memberListAdpater } from "@/adapters/members.adapter";

export function useMembersQuery(options?: { enabled?: boolean }) {
  return useQuery<IUser[]>({
    queryKey: queryKeys.members.all,
    queryFn: () => MemberServices.getMembers().then(memberListAdpater),
    ...options,
  });
}

export function useMemberQuery(id?: string, options?: { enabled?: boolean }) {
  return useQuery<IUser>({
    queryKey: queryKeys.members.detail(id || ""),
    queryFn: () => MemberServices.getById(id as string),
    enabled: !!id && options?.enabled !== false,
  });
}

export function useFreeMembersQuery(options?: { enabled?: boolean }) {
  return useQuery<IUser[]>({
    queryKey: queryKeys.members.free,
    queryFn: MemberServices.getFree,
    ...options,
  });
}

export function useSearchMembersQuery(value: string, enabled = false) {
  return useQuery<IUser[]>({
    queryKey: queryKeys.members.search(value),
    queryFn: () => MemberServices.searchMembers(value),
    enabled,
  });
}

export function useCreateMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateUser) =>
      MemberServices.createMember(data).then(memberAdpater),
    onSuccess: (created) => {
      queryClient.setQueryData<IUser[] | undefined>(
        queryKeys.members.all,
        (prev) => (prev ? [...prev, created] : [created])
      );
    },
  });
}

export function useUpdateMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: Partial<IUser> }) =>
      MemberServices.update(id, changes),
    onSuccess: (_updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.members.detail(id) });
    },
  });
}

export function useDeleteMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => MemberServices.delete(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
      queryClient.removeQueries({ queryKey: queryKeys.members.detail(id) });
    },
  });
}

export function useAddMemberToCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAddMember) => MemberServices.addToCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}

export function useRemoveMemberFromCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAddMember) => MemberServices.removeFromCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}
