import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EnterpiseServices } from "@/services/enterprise.services";
import { queryKeys } from "./queryKeys";
import { IEnterprise } from "@/interfaces/enterprise.interface";

export function useEnterprisesQuery(options?: { enabled?: boolean }) {
  return useQuery<IEnterprise[]>({
    queryKey: queryKeys.enterprises.all,
    queryFn: EnterpiseServices.getAll,
    ...options,
  });
}

export function useEnterpriseQuery(id?: string, options?: { enabled?: boolean }) {
  return useQuery<IEnterprise>({
    queryKey: queryKeys.enterprises.detail(id || ""),
    queryFn: () => EnterpiseServices.getById(id as string),
    enabled: !!id && options?.enabled !== false,
  });
}

export function useCreateEnterpriseMutation() {
  const queryClient = useQueryClient();
  return useMutation<IEnterprise, unknown, IEnterprise>({
    mutationFn: (data: IEnterprise) => EnterpiseServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enterprises.all });
    },
  });
}

export function useUpdateEnterpriseMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    IEnterprise,
    unknown,
    { id: string; changes: Partial<IEnterprise> }
  >({
    mutationFn: ({ id, changes }) => EnterpiseServices.update(id, changes),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enterprises.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.enterprises.detail(id),
      });
    },
  });
}
