import { CompanyServices } from "@/services/company.services";
import { MemberServices } from "@/services/member.services";
import { ServicesServices } from "@/services/services.services";
import { removeCompany } from "@/store/feature/company/companySlice";
import { removeMember } from "@/store/feature/members/membersSlice";
import { removeService } from "@/store/feature/services/servicesSlice";
import { useAppDispatch } from "@/store/hooks";

export default function useDeletingFetch() {
  const dispatch = useAppDispatch();

  const deleteCompany = async (id: string) => {
    try {
      await CompanyServices.delete(id);
      dispatch(removeCompany(id));
    } catch (error) {
      console.log("Error creating Companies", error);
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await ServicesServices.deleteService(id);
      dispatch(removeService(id));
    } catch (error) {
      console.log("Error deleting Service", error);
      throw error;
    }
  };
  const deletMember = async (id: string) => {
    try {
      await MemberServices.delete(id);
      dispatch(removeMember(id));
    } catch (error) {
      console.log("Error deleting User", error);
      throw error;
    }
  };
  return { deleteCompany, deleteService, deletMember };
}
