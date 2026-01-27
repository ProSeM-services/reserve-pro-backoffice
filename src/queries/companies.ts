import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CompanyServices } from "@/services/company.services";
import { queryKeys } from "./queryKeys";
import { IAddMember, ICompany, ICreateCompany } from "@/interfaces";

export function useCompaniesQuery(options?: { enabled?: boolean }) {
  return useQuery<ICompany[]>({
    queryKey: queryKeys.companies.all,
    queryFn: CompanyServices.getCompanies,
    ...options,
  });
}

export function useCompanyQuery(id?: string, options?: { enabled?: boolean }) {
  return useQuery<ICompany>({
    queryKey: queryKeys.companies.detail(id || ""),
    queryFn: () => CompanyServices.getCopanyById(id as string),
    enabled: !!id && options?.enabled !== false,
  });
}

export function useCreateCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateCompany & { usersIds?: string[] }) =>
      CompanyServices.createcompany(data),
    onSuccess: (created) => {
      queryClient.setQueryData<ICompany[] | undefined>(
        queryKeys.companies.all,
        (prev) => (prev ? [...prev, created] : [created])
      );
    },
  });
}

export function useUpdateCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      changes,
    }: {
      id: string;
      changes: Partial<ICompany>;
    }) => CompanyServices.updateCompany(id, changes),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
      if (updated?.id) {
        queryClient.setQueryData<ICompany | undefined>(
          queryKeys.companies.detail(updated.id),
          updated
        );
      }
    },
  });
}

export function useDeleteCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => CompanyServices.delete(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
      queryClient.removeQueries({ queryKey: queryKeys.companies.detail(id) });
    },
  });
}

export function useAddCompanyMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAddMember) => CompanyServices.addMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
    },
  });
}

export function useRemoveCompanyMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAddMember) => CompanyServices.removeMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
    },
  });
}
