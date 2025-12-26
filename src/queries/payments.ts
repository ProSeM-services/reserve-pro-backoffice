import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaymentServices } from "@/services/payment.services";
import { queryKeys } from "./queryKeys";
import { ICreatePayment, IPayment } from "@/interfaces/payment.interface";

export function usePaymentsQuery(options?: { enabled?: boolean }) {
  return useQuery<IPayment[]>({
    queryKey: queryKeys.payments.all,
    queryFn: PaymentServices.getPayments,
    ...options,
  });
}

export function useCreatePaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ICreatePayment) => PaymentServices.createPayment(body),
    onSuccess: (created) => {
      queryClient.setQueryData<IPayment[] | undefined>(
        queryKeys.payments.all,
        (prev) => (prev ? [created, ...prev] : [created])
      );
    },
  });
}

export function useUpdatePaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      changes,
    }: {
      id: string;
      changes: Partial<IPayment>;
    }) => PaymentServices.updatePayment(id, changes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
    },
  });
}

export function useSubscribeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { amount: number; frequency: number; plan_id: string }) =>
      PaymentServices.subscribe(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
    },
  });
}
