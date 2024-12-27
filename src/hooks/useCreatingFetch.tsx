import {
  ICompany,
  ICreateCompany,
  ICreateService,
  IService,
} from "@/interfaces";
import { ICreateMember, IMember } from "@/interfaces/member.iterface";
import { CompanyServices } from "@/services/company.services";
import { MemberServices } from "@/services/member.services";
import { ServicesServices } from "@/services/services.services";
import {
  addCompany,
  removeCompany,
  setCompanyIsUpdated,
} from "@/store/feature/company/companySlice";
import {
  addMember,
  setMemberUpdated,
} from "@/store/feature/members/membersSlice";
import {
  addService,
  setSerivicesUpdated,
} from "@/store/feature/services/servicesSlice";
import { useAppDispatch } from "@/store/hooks";

export default function useCreatingFetch() {
  const dispatch = useAppDispatch();
  const createCompany = async (data: ICreateCompany) => {
    try {
      //   dispatch(toggleCompanyLoading(true));
      const newCompany = await CompanyServices.createcompany(data);
      dispatch(addCompany(newCompany));
    } catch (error) {
      console.log("Error creating Companies", error);
    } finally {
      //   dispatch(toggleCompanyLoading(false));
    }
  };
  const updateCompany = async (id: string, data: Partial<ICompany>) => {
    try {
      //   dispatch(toggleCompanyLoading(true));

      await CompanyServices.updateCompany(
        id,
        data.image ? data : { ...data, image: "" }
      );

      dispatch(setCompanyIsUpdated(true));
    } catch (error) {
      console.log("Error updating company", error);

      throw new Error(
        "Error al actualizar la sucursal. Por favor intentar mas tarde!"
      );
    } finally {
      //   dispatch(toggleCompanyLoading(false));
    }
  };
  const deleteCompany = async (id: string) => {
    try {
      //   dispatch(toggleCompanyLoading(true));
      await CompanyServices.delete(id);
      dispatch(removeCompany(id));
    } catch (error) {
      console.log("Error creating Companies", error);
      throw error;
    } finally {
      //   dispatch(toggleCompanyLoading(false));
    }
  };
  const createMember = async (data: ICreateMember) => {
    try {
      //   dispatch(toggleMembersLoading(true));
      const newMember = await MemberServices.createMember(data);
      dispatch(addMember(newMember));
    } catch (error) {
      console.log("Error creating Member", error);
      throw error;
    } finally {
      //   dispatch(toggleMembersLoading(false));
    }
  };

  const editMember = async (id: string, data: Partial<IMember>) => {
    try {
      //   dispatch(toggleMembersLoading(true));
      await MemberServices.update(id, data);
      dispatch(setMemberUpdated(true));
    } catch (error) {
      console.log("Error creating Member", error);
      throw error;
    } finally {
      //   dispatch(toggleMembersLoading(false));
    }
  };
  const createService = async (data: ICreateService) => {
    try {
      //   dispatch(toggleMembersLoading(true));
      const newService = await ServicesServices.createService(data);
      dispatch(addService(newService));
    } catch (error) {
      console.log("Error creating Service", error);
    } finally {
      //   dispatch(toggleMembersLoading(false));
    }
  };

  const updateService = async (id: string, data: Partial<IService>) => {
    try {
      //   dispatch(toggleMembersLoading(true));
      await ServicesServices.updateService(id, data);
      dispatch(setSerivicesUpdated(true));
    } catch (error) {
      console.log("Error creating Service", error);
    } finally {
      //   dispatch(toggleMembersLoading(false));
    }
  };
  return {
    createCompany,
    createMember,
    createService,
    deleteCompany,
    updateCompany,
    updateService,
    editMember,
  };
}
