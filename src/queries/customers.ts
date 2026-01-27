import { useQuery } from "@tanstack/react-query";
import { CustomerServices } from "@/services/customer.services";
import { queryKeys } from "./queryKeys";
import {
  customerAdapter,
  customersListAdpater,
} from "@/adapters/customers.adapter";
import { IAPICustomer } from "@/interfaces/api/customer.interface";
import { IUser } from "@/interfaces";
import { ICustomer } from "@/interfaces/customer.interface";

export function useCustomersQuery(
  options?: { enabled?: boolean; currentUser?: IUser | null }
) {
  const currentUser = options?.currentUser;
  return useQuery<IAPICustomer[], unknown, ICustomer[]>({
    queryKey: queryKeys.customers.all,
    queryFn: () => CustomerServices.getAll(),
    select: (customers) => {
      if (currentUser?.role === "BASIC") {
        const filtered = customers
          .map((customer) => {
            const memberAppointments = customer.Appointments.filter(
              (app) => app.UserId === currentUser.id
            );
            if (memberAppointments.length > 0) {
              const res: IAPICustomer = {
                ...customer,
                Appointments: memberAppointments,
              };
              return res;
            }
            return undefined;
          })
          .filter((item): item is IAPICustomer => !!item);
        return customersListAdpater(filtered);
      }
      return customersListAdpater(customers);
    },
    enabled: options?.enabled,
  });
}

export function useCustomerQuery(id?: string, options?: { enabled?: boolean }) {
  return useQuery<IAPICustomer, unknown, ICustomer>({
    queryKey: queryKeys.customers.detail(id || ""),
    queryFn: () => CustomerServices.getById(id as string),
    select: customerAdapter,
    enabled: !!id && options?.enabled !== false,
  });
}
