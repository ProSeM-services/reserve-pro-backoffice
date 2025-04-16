import { memberAdpater } from "@/adapters/members.adapter";
import {
  ICompany,
  ICreateCompany,
  ICreateService,
  IService,
} from "@/interfaces";
import { IAppointment } from "@/interfaces/appointments.interface";
import { ICreateMember, IMember } from "@/interfaces/member.iterface";
import { AppointmentServices } from "@/services/appointment.services";
import { CompanyServices } from "@/services/company.services";
import { MemberServices } from "@/services/member.services";
import { ServicesServices } from "@/services/services.services";
import { editAppointment } from "@/store/feature/appointnments/appointmentsSlice";
import {
  addCompany,
  removeCompany,
  updateCompany,
} from "@/store/feature/company/companySlice";
import { addMember, updateMember } from "@/store/feature/members/membersSlice";
import {
  addService,
  updateService,
} from "@/store/feature/services/servicesSlice";
import { useAppDispatch } from "@/store/hooks";

export default function useCreatingFetch() {
  const dispatch = useAppDispatch();
  const createCompany = async (data: ICreateCompany) => {
    try {
      //   dispatch(toggleCompanyLoading(true));
      const newCompany = await CompanyServices.createcompany(data);
      dispatch(addCompany(newCompany));
      return newCompany;
    } catch (error) {
      console.log("Error creating Companies", error);
    } finally {
      //   dispatch(toggleCompanyLoading(false));
    }
  };
  const editCompany = async (id: string, data: Partial<ICompany>) => {
    try {
      //   dispatch(toggleCompanyLoading(true));

      await CompanyServices.updateCompany(
        id,
        data.image ? data : { ...data, image: "" }
      );

      dispatch(updateCompany({ id, changes: data }));
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
      dispatch(addMember(memberAdpater(newMember)));
    } catch (error) {
      console.log("Error creating Member", error);
      throw error;
    } finally {
      //   dispatch(toggleMembersLoading(false));
    }
  };

  const editMember = async (id: string, data: Partial<IMember>) => {
    try {
      await MemberServices.update(id, data);
      dispatch(updateMember({ id, changes: data }));
    } catch (error) {
      console.log("Error creating Member", error);
      throw error;
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

  const editService = async (id: string, data: Partial<IService>) => {
    try {
      //   dispatch(toggleMembersLoading(true));
      await ServicesServices.updateService(id, data);
      dispatch(updateService({ id, changes: data }));
    } catch (error) {
      console.log("Error creating Service", error);
    } finally {
      //   dispatch(toggleMembersLoading(false));
    }
  };

  const updateAppointment = async (id: string, data: Partial<IAppointment>) => {
    try {
      //   dispatch(toggleMembersLoading(true));
      await AppointmentServices.update(id, data);
      dispatch(editAppointment({ changes: data, id }));
    } catch (error) {
      console.log("Error creating Service", error);
    } finally {
      //   dispatch(toggleMembersLoading(false));
    }
  };
  const addServicesToCompany = async (
    servicesIds: string[],
    companyId: string
  ) => {
    try {
      const allServicesToAdd = servicesIds.map((serviceId) =>
        ServicesServices.addToCompany({ companyId, serviceId })
      );
      await Promise.all(allServicesToAdd);
      const updatedCompany = await CompanyServices.getCopanyById(companyId);
      dispatch(updateCompany({ id: companyId, changes: updatedCompany }));
    } catch (error) {}
  };
  const addMemberToService = async (
    membersIds: string[],
    serviceId: string
  ) => {
    try {
      const allMembersToAdd = membersIds.map((userId) =>
        ServicesServices.addMember({ serviceId, userId })
      );
      await Promise.all(allMembersToAdd);
      const updatedService = await ServicesServices.getById(serviceId);
      dispatch(updateService({ id: serviceId, changes: updatedService }));
    } catch (error) {}
  };
  const addMembersToCompany = async (
    membersIds: string[],
    companyId: string
  ) => {
    try {
      const allMembersToAdd = membersIds.map((userId) =>
        MemberServices.addToCompany({ companyId, userId })
      );
      await Promise.all(allMembersToAdd);
      const updatedCompany = await CompanyServices.getCopanyById(companyId);
      dispatch(updateCompany({ id: companyId, changes: updatedCompany }));
    } catch (error) {}
  };
  const removeMemberFromService = async (userId: string, serviceId: string) => {
    try {
      await ServicesServices.removeMember({ serviceId, userId });
      const updatedService = await ServicesServices.getById(serviceId);
      dispatch(updateService({ id: serviceId, changes: updatedService }));
    } catch (error) {}
  };
  const removeMemberFromCompany = async (userId: string, companyId: string) => {
    try {
      await MemberServices.removeFromCompany({
        companyId,
        userId,
      });
      const updatedCompany = await CompanyServices.getCopanyById(companyId);
      dispatch(updateCompany({ id: companyId, changes: updatedCompany }));
    } catch (error) {}
  };
  const removeServiceFromCompany = async (
    serviceId: string,
    companyId: string
  ) => {
    try {
      await ServicesServices.removeFromCompany({
        companyId,
        serviceId,
      });
      const updatedCompany = await CompanyServices.getCopanyById(companyId);
      dispatch(updateCompany({ id: companyId, changes: updatedCompany }));
    } catch (error) {}
  };
  return {
    addMembersToCompany,
    addServicesToCompany,
    addMemberToService,
    createCompany,
    createMember,
    createService,
    deleteCompany,
    editCompany,
    editService,
    editMember,
    updateAppointment,
    removeMemberFromService,
    removeMemberFromCompany,
    removeServiceFromCompany,
  };
}
