import { AdminServices } from "@/services/admin.service";
import { NotificationServices } from "@/services/notification.service";
import { PaymentPlanServices } from "@/services/payment-plans.service";
import {
  setCompanies,
  toggleCompanyLoading,
} from "@/store/feature/company/companySlice";
import {
  setEnterprises,
  toggleEnterprisesLoading,
} from "@/store/feature/enterprise/enterpriseSlice";
import {
  setAccounts,
  setMembers,
  toggleMembersLoading,
} from "@/store/feature/members/membersSlice";
import { setNotifications } from "@/store/feature/notifications/notificationsSlice";
import { setPaymentPlans } from "@/store/feature/payment-plans/paymentPlanSlice";
import { setPayments } from "@/store/feature/payments/paymentSlice";
import { useAppDispatch } from "@/store/hooks";

export function useFetchAdminData() {
  const dispatch = useAppDispatch();
  const fetchAccounts = async () => {
    try {
      dispatch(toggleMembersLoading(true));
      const members = await AdminServices.getAllUsers();
      const accounts = await AdminServices.getAllAccounts();
      dispatch(setAccounts({ members: accounts, fromServer: true }));
      dispatch(setMembers({ members: members, fromServer: true }));
    } catch (error) {
      console.log("Error fetchin Accounts [ADMIN] : ", error);
    } finally {
      dispatch(toggleMembersLoading(false));
    }
  };
  const fetchEnterprises = async () => {
    try {
      dispatch(toggleEnterprisesLoading(true));
      const res = await AdminServices.getAllEnterprises();
      dispatch(setEnterprises(res));
    } catch (error) {
      console.log("Error fetchin Enterprises [ADMIN] : ", error);
    } finally {
      dispatch(toggleEnterprisesLoading(false));
    }
  };
  const fetchNotifications = async () => {
    try {
      const res = await NotificationServices.getAllNotifications({
        read: false,
      });
      dispatch(setNotifications(res));

      return res;
    } catch (error) {
      console.log("Error fetchin Notifications [ADMIN] : ", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const users = await AdminServices.getAllUsers();
      return users;
    } catch (error) {
      console.log("Error fetchin Users [ADMIN] : ", error);
    }
  };
  const fetchCompanies = async () => {
    try {
      dispatch(toggleCompanyLoading(true));
      const companies = await AdminServices.getAllCompanies();
      dispatch(setCompanies({ companies, fromServer: true }));
    } catch (error) {
      console.log("Error fetchin Users [ADMIN] : ", error);
    } finally {
      dispatch(toggleCompanyLoading(false));
    }
  };
  const fetchPayments = async () => {
    try {
      dispatch(toggleCompanyLoading(true));
      const payments = await AdminServices.getPayments();
      dispatch(setPayments({ payments, fromServer: true }));
    } catch (error) {
      console.log("Error fetchin Users [ADMIN] : ", error);
    } finally {
      dispatch(toggleCompanyLoading(false));
    }
  };
  const fetchPaymentsPlans = async () => {
    try {
      dispatch(toggleCompanyLoading(true));
      const paymentPlans = await PaymentPlanServices.getAll();
      dispatch(setPaymentPlans({ paymentPlans, fromServer: true }));
    } catch (error) {
      console.log("Error fetchin PaymentPlans [ADMIN] : ", error);
    } finally {
      dispatch(toggleCompanyLoading(false));
    }
  };

  return {
    fetchAccounts,
    fetchEnterprises,
    fetchNotifications,
    fetchUsers,
    fetchCompanies,
    fetchPayments,
    fetchPaymentsPlans,
  };
}
