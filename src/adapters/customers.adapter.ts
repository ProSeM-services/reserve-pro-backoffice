import { IAPICustomer } from "@/interfaces/api/customer.interface";
import { ICustomer } from "@/interfaces/customer.interface";

export function customerAdapter(customer: IAPICustomer): ICustomer {
  const {
    Appointments,
    createdAt,
    email,
    firstName,
    id,
    lastName,
    phone,
    tenantName,
  } = customer;

  return {
    appointments: Appointments,
    fullName: `${firstName}, ${lastName}`,
    createdAt,
    email,
    firstName,
    id,
    lastName,
    phone,
    tenantName,
  };
}
export function customersListAdpater(customers: IAPICustomer[]): ICustomer[] {
  return customers.map((data) => customerAdapter(data));
}
