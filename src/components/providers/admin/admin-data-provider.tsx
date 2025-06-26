import { setAuthInterceptor } from "@/config/axios.config";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import useFetchData from "@/hooks/useFetchData";
import { LoaderMain } from "@/components/common/loader-main";
import { useFetchAdminData } from "@/hooks/admin/fetchAdminData";

export default function AdminDataProvider({ children }: PropsWithChildren) {
  const { setMainLoaderStatus } = useFetchData();

  const {
    fetchAccounts,
    fetchEnterprises,
    fetchNotifications,
    fetchPayments,
    fetchCompanies,
    fetchPaymentsPlans,
  } = useFetchAdminData();

  const { fetched: membersFetched, memberLogged } = useAppSelector(
    (s) => s.member
  );
  const { fetched: mainFetched } = useAppSelector((s) => s.main);
  const { fetched: companyFetched } = useAppSelector((s) => s.company);
  const { fetched: paymentsPlansFetched } = useAppSelector(
    (s) => s.paymentsPlans
  );
  const { fetched: paymentsFetched } = useAppSelector((s) => s.payments);
  const { fetched: enterpriseFetched } = useAppSelector((s) => s.enterprise);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      try {
        setMainLoaderStatus(false);
        await setAuthInterceptor(accessToken);
        await fetchNotifications();

        !membersFetched && (await fetchAccounts());
        !companyFetched && (await fetchCompanies());
        !enterpriseFetched && (await fetchEnterprises());
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

  if (!mainFetched)
    return (
      // THIS IS THE LOADER DISPLAYED WHEN THE DATA IS COMING FROM THE SERVER AT THE FIRST LOAD OF THE WEB APP
      <LoaderMain />
    );
  return <Fragment>{children}</Fragment>;
}
