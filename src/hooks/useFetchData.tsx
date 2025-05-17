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
import { memberListAdpater } from "@/adapters/members.adapter";
import { appointmentListAdpater } from "@/adapters/appointments.adpater";
import { customersListAdpater } from "@/adapters/customers.adapter";
import { IAPICustomer } from "@/interfaces/api/customer.interface";
import { IUser } from "@/interfaces";
import {
  setPayments,
  togglePaymentsLoading,
} from "@/store/feature/payments/paymentSlice";
import { PaymentServices } from "@/services/payment.services";

export default function useFetchData() {
  const storageMember = localStorage.getItem("userLogged");
  const member = storageMember ? (JSON.parse(storageMember) as IUser) : null;

  const dispatch = useAppDispatch();
  const setMainLoaderStatus = (status: boolean) => {
    dispatch(setMainFetched(status));
  };

  const fetchPayments = async () => {
    try {
      dispatch(togglePaymentsLoading(true));
      const payments = await PaymentServices.getPayments();
      dispatch(setPayments({ payments, fromServer: true }));
    } catch (error) {
      console.log("Error fetching Paymetns", error);
    } finally {
      dispatch(togglePaymentsLoading(false));
    }
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
      if (!member) return;
      const role = member.role;
      dispatch(toggleCustomersLoading(true));
      const customers = await CustomerServices.getAll();
      if (role === "BASIC") {
        const filteredCustomers = customers
          .map((customer) => {
            const memberAppointmnets = customer.Appointments.filter(
              (app) => app.UserId === member.id
            );

            if (memberAppointmnets.length > 0) {
              const res: IAPICustomer = {
                ...customer,
                Appointments: memberAppointmnets,
              };

              return res;
            }
          })
          .filter((e) => e !== undefined);

        console.log("Filtered Customers", filteredCustomers);
        dispatch(setCustomers(customersListAdpater(filteredCustomers)));
      } else {
        dispatch(setCustomers(customersListAdpater(customers)));
      }
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleCustomersLoading(false));
    }
  };
  const fetchAppointments = async () => {
    try {
      if (!member) return;
      const role = member.role;
      dispatch(toggleAppointmentsLoading(true));
      const { appointments, limit, offset, page, total } =
        await AppointmentServices.getAll();

      if (role === "BASIC") {
        const filteredAppointmnets = appointments.filter(
          (app) => app.UserId === member.id
        );
        dispatch(
          setAppointments({
            appointments: appointmentListAdpater(filteredAppointmnets),
            fromServer: true,
          })
        );
      } else {
        dispatch(
          setAppointments({
            appointments: appointmentListAdpater(appointments),
            fromServer: true,
          })
        );
      }
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
  const fetchMemberLogged = (member: IUser) => {
    dispatch(setSession(member));
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
    fetchPayments,
  };
}
