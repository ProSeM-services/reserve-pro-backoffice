import { setAuthInterceptor } from "@/config/axios.config";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { LoaderMain } from "../common/loader-main";
import {
  useAppointmentsQuery,
  useCompaniesQuery,
  useCustomersQuery,
  useMembersQuery,
  usePaymentsQuery,
  useServicesQuery,
} from "@/queries";

export default function DataProvider({ children }: PropsWithChildren) {
  const [bootstrapping, setBootstrapping] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  const companiesQuery = useCompaniesQuery();
  const membersQuery = useMembersQuery();
  const customersQuery = useCustomersQuery();
  const appointmentsQuery = useAppointmentsQuery();
  const servicesQuery = useServicesQuery();
  const paymentsQuery = usePaymentsQuery();
  const paymentsPlansQuery = usePaymentsQuery();

  const isLoading =
    companiesQuery.isLoading ||
    membersQuery.isLoading ||
    customersQuery.isLoading ||
    appointmentsQuery.isLoading ||
    servicesQuery.isLoading ||
    paymentsQuery.isLoading ||
    paymentsPlansQuery.isLoading ||
    paymentsPlansQuery.data === undefined;

  useEffect(() => {
    const bootstrap = async () => {
      try {
        if (accessToken) {
          await setAuthInterceptor(accessToken);
        }
      } catch (error) {
        console.log("Error setting auth interceptor", error);
      } finally {
        setBootstrapping(false);
      }
    };
    bootstrap();
  }, [accessToken]);

  if (bootstrapping || isLoading) return <LoaderMain />;
  return <Fragment>{children}</Fragment>;
}
