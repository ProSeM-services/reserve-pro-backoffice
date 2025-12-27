import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubscriptionServices } from "@/services/subscription.service";
import { queryKeys } from "./queryKeys";
import {
  ICreateSubscription,
  ISubscription,
} from "@/interfaces/subscription.schema";

export function useSubscriptionQuery(
  enterpriseId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery<ISubscription>({
    queryKey: queryKeys.subscription.byEnterprise(enterpriseId || ""),
    queryFn: () =>
      SubscriptionServices.getSubscription(enterpriseId as string),
    enabled: !!enterpriseId && options?.enabled !== false,
  });
}

export function useCreateSubscriptionMutation() {
  const queryClient = useQueryClient();
  return useMutation<ISubscription, unknown, ICreateSubscription>({
    mutationFn: (body: ICreateSubscription) => SubscriptionServices.create(body),
    onSuccess: (subscription: ISubscription) => {
      if (subscription?.EnterpriseId) {
        queryClient.setQueryData<ISubscription | undefined>(
          queryKeys.subscription.byEnterprise(subscription.EnterpriseId),
          subscription
        );
      }
    },
  });
}
