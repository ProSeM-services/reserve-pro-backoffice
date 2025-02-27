import { CompanyServices } from "@/services/company.services";
import { ServicesServices } from "@/services/services.services";
import { removeCompany } from "@/store/feature/company/companySlice";
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
      console.log(`Service ${id} deleted successfully`);
    } catch (error) {
      console.log("Error deleting Service", error);
      throw error;
    }
  };
  return { deleteCompany, deleteService };
}
