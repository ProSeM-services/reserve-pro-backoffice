import { setAuthInterceptor } from "@/config/axios.config";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { BarLoader } from "@/components/common/bar-loader";
import useFetchData from "@/hooks/useFetchData";

export default function DataProvider({ children }: PropsWithChildren) {
  const {
    fetchCompanies,
    fetchMembers,
    fetchCustomers,
    fetchServices,
    fetchAppointments,
    setMainLoaderStatus,
    fetchMemberLogged,
  } = useFetchData();

  const { fetched: companyFetched } = useAppSelector((s) => s.company);
  const { fetched: membersFetched } = useAppSelector((s) => s.member);
  const { fetched: customerFetched } = useAppSelector((s) => s.customers);
  const { fetched: servicesFetched } = useAppSelector((s) => s.service);
  const { fetched: mainFetched } = useAppSelector((s) => s.main);
  const { fetched: sessionFetched, session } = useAppSelector((s) => s.session);

  const { fetched: appointmentsFetched } = useAppSelector(
    (s) => s.appointments
  );

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      try {
        setMainLoaderStatus(false);
        await setAuthInterceptor(accessToken);
        !companyFetched && (await fetchCompanies());
        !membersFetched && (await fetchMembers());
        !customerFetched && (await fetchCustomers());
        !servicesFetched && (await fetchServices());
        !appointmentsFetched && (await fetchAppointments());
        !sessionFetched && !session && (await fetchMemberLogged());
      } catch (error) {
        console.log("error fetching data", error);
      } finally {
        setMainLoaderStatus(true);
      }
    };
    fetchData();
  }, [accessToken]);
  if (!mainFetched)
    return (
      <div className=" size-full overflow-hidden">
        <div className=" h-full max-h-full max-md:max-h-[92%]     overflow-hidden rounded-md p-4">
          <div className="flex items-center justify-center h-screen  relative">
            <BarLoader />
            <div className="relative">
              {/* Fondo de la animación */}
              <div className="absolute  inset-0  bg-gradient-to-r from-primary via-green-600 to-grenn-500 blur-xl rounded-full animate-pulse"></div>
              {/* Círculo animado:  border-4 border-t-4 border-t-primary border-primary/25 rounded-full animate-spin */}
              <div className="size-16"></div>
            </div>
          </div>
        </div>
      </div>
    );
  return <Fragment>{children}</Fragment>;
}
