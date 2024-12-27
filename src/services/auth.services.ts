import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { UserZod } from "@/interfaces";
import { ILoginResponse } from "@/interfaces/auth.interface";
import { ICreateTentant, ITentant } from "@/interfaces/member.iterface";
import axios from "axios";

export class AuthServices {
  static async login(data: unknown): Promise<ILoginResponse> {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);

    return response.data;
  }
  static async register(data: ICreateTentant): Promise<ITentant> {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);

    return response.data;
  }
  static async confirmEmail(data: { token: string }): Promise<ITentant> {
    const response = await axios.post(`${BASE_URL}/auth/confirmation`, data);

    return response.data;
  }
  static async me(): Promise<UserZod> {
    const response = await axiosInstance.post(`${BASE_URL}/auth/me`);

    return response.data;
  }
}
