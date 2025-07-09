import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IUser } from "@/interfaces";
import { ILoginResponse } from "@/interfaces/auth.interface";
import { IUserRegister } from "@/interfaces/user.interface";
import axios from "axios";

export class AuthServices {
  static async login(data: unknown): Promise<ILoginResponse> {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);

    return response.data;
  }
  static async register(data: IUserRegister): Promise<IUser> {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);

    return response.data;
  }
  static async confirmEmail(data: { token: string }): Promise<IUser> {
    const response = await axios.post(`${BASE_URL}/auth/confirmation`, data);

    return response.data;
  }
  static async getUserByToken(data: { token: string }): Promise<IUser> {
    const response = await axios.post(
      `${BASE_URL}/auth/get-user-by-token`,
      data
    );

    return response.data;
  }
  static async me(): Promise<IUser> {
    const response = await axiosInstance.post(`${BASE_URL}/auth/me`);

    return response.data;
  }
  static async resetPasswordEmail(email: string) {
    const response = await axiosInstance.post(
      `${BASE_URL}/auth/reset-password`,
      { email }
    );

    return response.data;
  }
  static async updatePassword(body: {
    password: string;
    userId: string;
    newPassword: string;
  }) {
    const response = await axiosInstance.patch(
      `${BASE_URL}/auth/update-password`,
      body
    );

    return response.data;
  }
}
