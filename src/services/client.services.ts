import { BASE_URL } from "@/config/axios.config";
import { ICompany, IService } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import axios from "axios";

export class ClientServices {
  static async getCompanies({
    query,
    category,
    city,
  }: {
    query: string;
    category: string;
    city: string;
  }): Promise<ICompany[]> {
    const res = await axios.get(
      `${BASE_URL}/company/clients?name=${query}&category=${category}&city=${city}`
    );
    return res.data;
  }
  static async getCompanyById(id: string): Promise<ICompany> {
    const res = await axios.get(
      `${BASE_URL}/company/clients/company-detail/${id}`
    );
    return res.data;
  }
  static async getServicesById(id: string): Promise<IService> {
    const res = await axios.get(`${BASE_URL}/services/clients/${id}`);
    return res.data;
  }
  static async getMemberById(id: string): Promise<IMember> {
    const res = await axios.get(`${BASE_URL}/user/clients/${id}`);
    return res.data;
  }
  static async getCompanyServices(companyId: string): Promise<IService[]> {
    const res = await axios.get(
      `${BASE_URL}/company/clients/company-detail/${companyId}/services`
    );
    return res.data;
  }
  static async getCompanyMembers(companyId: string): Promise<IMember[]> {
    const res = await axios.get(
      `${BASE_URL}/client/companies/${companyId}/members`
    );
    return res.data;
  }
  static async getServiceMembers(serviceId: string): Promise<IMember[]> {
    const res = await axios.get(
      `${BASE_URL}/client/services/${serviceId}/members`
    );
    return res.data;
  }
}
