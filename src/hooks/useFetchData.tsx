import { AppointmentServices } from "@/services/appointment.services";
import { CompanyServices } from "@/services/company.services";
import { CustomerServices } from "@/services/customer.services";
import { MemberServices } from "@/services/member.services";
import { ServicesServices } from "@/services/services.services";
import {
  setAppointments,
  setAppointmentsTableData,
  toggleAppointmentsLoading,
} from "@/store/feature/appointnments/appointmentsSlice";
import {
  setCompanies,
  setSelectedCompany,
  toggleCompanyLoading,
} from "@/store/feature/company/companySlice";
import {
  setCustomers,
  toggleCustomersLoading,
} from "@/store/feature/customers/customerSlice";
import {
  setMembers,
  toggleMembersLoading,
} from "@/store/feature/members/membersSlice";
import {
  setServices,
  toggleServiceLoading,
} from "@/store/feature/services/servicesSlice";
import { setMainFetched } from "@/store/feature/main/mainSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSession } from "@/store/feature/session/sessionSlice";
import { AuthServices } from "@/services/auth.services";
import { memberListAdpater } from "@/adapters/members.adapter";
import { appointmentListAdpater } from "@/adapters/appointments.adpater";
import { customersListAdpater } from "@/adapters/customers.adapter";

export default function useFetchData() {
  const dispatch = useAppDispatch();
  const setMainLoaderStatus = (status: boolean) => {
    dispatch(setMainFetched(status));
  };
  const fetchCompanies = async () => {
    try {
      dispatch(toggleCompanyLoading(true));
      const companies = await CompanyServices.getCompanies();
      dispatch(setCompanies({ companies, fromServer: true }));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleCompanyLoading(false));
    }
  };
  const fetchMembers = async () => {
    try {
      dispatch(toggleMembersLoading(true));
      const members = await MemberServices.getMembers();
      dispatch(
        setMembers({ members: memberListAdpater(members), fromServer: true })
      );
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleMembersLoading(false));
    }
  };
  const fetchServices = async () => {
    try {
      dispatch(toggleServiceLoading(true));
      const services = await ServicesServices.getAll();
      dispatch(setServices({ services, fromServer: true }));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleServiceLoading(false));
    }
  };
  const fetchCustomers = async () => {
    try {
      dispatch(toggleCustomersLoading(true));
      const customers = await CustomerServices.getAll();
      console.log("customers", customers);
      dispatch(setCustomers(customersListAdpater(customers)));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleCustomersLoading(false));
    }
  };
  const fetchAppointments = async () => {
    try {
      dispatch(toggleAppointmentsLoading(true));
      const { appointments, limit, offset, page, total } =
        await AppointmentServices.getAll();
      dispatch(
        setAppointments({
          appointments: appointmentListAdpater(appointments),
          fromServer: true,
        })
      );
      dispatch(setAppointmentsTableData({ limit, offset, page, total }));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleAppointmentsLoading(false));
    }
  };

  const fetchCompanyData = async (id: string) => {
    try {
      dispatch(toggleAppointmentsLoading(true));
      const company = await CompanyServices.getCopanyById(id);
      dispatch(setSelectedCompany(company.id));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleAppointmentsLoading(false));
    }
  };
  const fetchMemberLogged = async () => {
    try {
      dispatch(toggleMembersLoading(true));
      const member = await AuthServices.me();
      dispatch(setSession(member));
    } catch (error) {
      console.log("Error fetching Member logged", error);
    } finally {
      dispatch(toggleMembersLoading(false));
    }
  };
  const { inmutablesCompanies } = useAppSelector((s) => s.company);
  const { inmutableMembers } = useAppSelector((s) => s.member);
  const { inmutablesAppointments } = useAppSelector((s) => s.appointments);

  const setCrossCompanyData = (companyId: string) => {
    if (companyId === "all") {
      dispatch(
        setCompanies({
          companies: inmutablesCompanies,
          fromServer: false,
        })
      );
      dispatch(
        setMembers({
          members: inmutableMembers,
          fromServer: false,
        })
      );
      dispatch(
        setAppointments({
          appointments: inmutablesAppointments,
          fromServer: false,
        })
      );
      return;
    }
    dispatch(
      setCompanies({
        companies: inmutablesCompanies.filter((e) => e.id === companyId),
        fromServer: false,
      })
    );
    dispatch(
      setMembers({
        members: inmutableMembers.filter((e) => e.CompanyId === companyId),
        fromServer: false,
      })
    );
    dispatch(
      setAppointments({
        appointments: inmutablesAppointments.filter(
          (e) => e.companyId === companyId
        ),
        fromServer: false,
      })
    );
  };
  const clearStore = () => {
    dispatch(setCompanies({ companies: [] }));
    dispatch(setMembers({ members: [] }));
    dispatch(setAppointments({ appointments: [] }));
    dispatch(setServices({ services: [] }));
    dispatch(setCustomers([]));
  };
  return {
    clearStore,
    fetchCompanies,
    fetchMembers,
    fetchCustomers,
    setMainLoaderStatus,
    fetchServices,
    fetchAppointments,
    fetchCompanyData,
    fetchMemberLogged,
    setCrossCompanyData,
  };
}
