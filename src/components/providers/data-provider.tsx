import { setAuthInterceptor } from "@/config/axios.config";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
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
    setCrossCompanyData,
  } = useFetchData();

  const { fetched: companyFetched } = useAppSelector((s) => s.company);
  const { fetched: membersFetched } = useAppSelector((s) => s.member);
  const { fetched: customerFetched } = useAppSelector((s) => s.customers);
  const { fetched: servicesFetched } = useAppSelector((s) => s.service);
  const { fetched: mainFetched, crossCompanyId } = useAppSelector(
    (s) => s.main
  );
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
  useEffect(() => {
    if (!crossCompanyId) return;
    setCrossCompanyData(crossCompanyId);
  }, [crossCompanyId]);
  if (!mainFetched)
    return (
      // THIS IS THE LOADER DISPLAYED WHEN THE DATA IS COMING FROM THE SERVER AT THE FIRST LOAD OF THE WEB APP
      <div className=" size-full overflow-hidden">
        <div className=" h-full max-h-full max-md:max-h-[92%]     overflow-hidden rounded-md p-4">
          <div className="flex items-center justify-center h-screen  ">
            <div className="relative">
              {/* Fondo de la animación */}
              <div className="absolute  inset-10  bg-gradient-to-r from-primary via-green-600  blur-3xl size-[170px] rounded-full animate-pulse outline"></div>
              {/* Círculo animado:  border-4 border-t-4 border-t-primary border-primary/25 rounded-full animate-spin */}
              <div className=" h-full w-full flex items-center justify-center">
                <img
                  src="/images/reserve-pro-high-resolution-logo-transparent.png"
                  className="w-[250px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return <Fragment>{children}</Fragment>;
}
