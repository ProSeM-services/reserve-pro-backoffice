import { setAuthInterceptor } from "@/config/axios.config";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import useFetchData from "@/hooks/useFetchData";
import { LoaderMain } from "../common/loader-main";

export default function DataProvider({ children }: PropsWithChildren) {
  const {
    fetchCompanies,
    fetchMembers,
    fetchCustomers,
    fetchServices,
    fetchAppointments,
    setMainLoaderStatus,
    setCrossCompanyData,
    fetchPayments,
    fetchPaymentsPlans,
  } = useFetchData();

  const { fetched: companyFetched } = useAppSelector((s) => s.company);
  const { fetched: paymentsPlansFetched } = useAppSelector(
    (s) => s.paymentsPlans
  );
  const { fetched: membersFetched, memberLogged } = useAppSelector(
    (s) => s.member
  );
  const { fetched: customerFetched } = useAppSelector((s) => s.customers);
  const { fetched: servicesFetched } = useAppSelector((s) => s.service);
  const { fetched: mainFetched, crossCompanyId } = useAppSelector(
    (s) => s.main
  );

  const { fetched: appointmentsFetched } = useAppSelector(
    (s) => s.appointments
  );
  const { fetched: paymentsFetched } = useAppSelector((s) => s.payments);

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      try {
        setMainLoaderStatus(false);
        await setAuthInterceptor(accessToken);
        !membersFetched && (await fetchMembers());
        !companyFetched && (await fetchCompanies());
        !customerFetched && (await fetchCustomers());
        !servicesFetched && (await fetchServices());
        !appointmentsFetched && (await fetchAppointments());
        !paymentsFetched && (await fetchPayments());
        !paymentsPlansFetched && (await fetchPaymentsPlans());
      } catch (error) {
        console.log("error fetching data", error);
      } finally {
        setMainLoaderStatus(true);
      }
    };
    fetchData();
  }, [memberLogged]);
  useEffect(() => {
    if (!crossCompanyId) return;
    setCrossCompanyData(crossCompanyId);
  }, [crossCompanyId]);
  if (!mainFetched)
    return (
      // THIS IS THE LOADER DISPLAYED WHEN THE DATA IS COMING FROM THE SERVER AT THE FIRST LOAD OF THE WEB APP
      <LoaderMain />
    );
  return <Fragment>{children}</Fragment>;
}
