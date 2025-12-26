import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaymentPlanServices } from "@/services/payment-plans.service";
import { queryKeys } from "./queryKeys";
import {
  CreatePaymentPlan,
  PaymentPlan,
} from "@/interfaces/payment-plans.interface";

export function usePaymentPlansQuery(options?: { enabled?: boolean }) {
  return useQuery<PaymentPlan[]>({
    queryKey: queryKeys.paymentPlans.all,
    queryFn: PaymentPlanServices.getAll,
    ...options,
  });
}

export function useCreatePaymentPlanMutation() {
  const queryClient = useQueryClient();
  return useMutation<PaymentPlan, unknown, CreatePaymentPlan>({
    mutationFn: (body: CreatePaymentPlan) => PaymentPlanServices.create(body),
    onSuccess: (created) => {
      queryClient.setQueryData<PaymentPlan[] | undefined>(
        queryKeys.paymentPlans.all,
        (prev) => (prev ? [...prev, created] : [created])
      );
    },
  });
}

export function useUpdatePaymentPlanMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    PaymentPlan,
    unknown,
    { id: string; changes: Partial<CreatePaymentPlan> }
  >({
    mutationFn: ({ id, changes }) => PaymentPlanServices.update(id, changes),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paymentPlans.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.paymentPlans.detail(id),
      });
    },
  });
}

export function useDeletePaymentPlanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => PaymentPlanServices.delete(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paymentPlans.all });
      queryClient.removeQueries({ queryKey: queryKeys.paymentPlans.detail(id) });
    },
  });
}
