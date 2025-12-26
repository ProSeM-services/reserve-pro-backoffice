import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServicesServices } from "@/services/services.services";
import { queryKeys } from "./queryKeys";
import {
  IAddMemberToService,
  IAddService,
  ICreateService,
  IService,
} from "@/interfaces";

export function useServicesQuery(options?: { enabled?: boolean }) {
  return useQuery<IService[]>({
    queryKey: queryKeys.services.all,
    queryFn: ServicesServices.getAll,
    ...options,
  });
}

export function useServiceQuery(id?: string, options?: { enabled?: boolean }) {
  return useQuery<IService>({
    queryKey: queryKeys.services.detail(id || ""),
    queryFn: () => ServicesServices.getById(id as string),
    enabled: !!id && options?.enabled !== false,
  });
}

export function useServicesByMemberQuery(
  memberId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery<IService[]>({
    queryKey: queryKeys.services.byMember(memberId || ""),
    queryFn: () => ServicesServices.getByMemberId(memberId as string),
    enabled: !!memberId && options?.enabled !== false,
  });
}

export function useCreateServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateService) => ServicesServices.createService(data),
    onSuccess: (created) => {
      queryClient.setQueryData<IService[] | undefined>(
        queryKeys.services.all,
        (prev) => (prev ? [...prev, created] : [created])
      );
    },
  });
}

export function useUpdateServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      changes,
    }: {
      id: string;
      changes: Partial<IService>;
    }) => ServicesServices.updateService(id, changes),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all });
      if (updated?.id) {
        queryClient.setQueryData<IService | undefined>(
          queryKeys.services.detail(updated.id),
          updated
        );
      }
    },
  });
}

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ServicesServices.deleteService(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all });
      queryClient.removeQueries({ queryKey: queryKeys.services.detail(id) });
    },
  });
}

export function useAddServiceToCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAddService) => ServicesServices.addToCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}

export function useRemoveServiceFromCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAddService) => ServicesServices.removeFromCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}

export function useAddMemberToServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAddMemberToService) => ServicesServices.addMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
    },
  });
}

export function useRemoveMemberFromServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAddMemberToService) =>
      ServicesServices.removeMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
    },
  });
}
