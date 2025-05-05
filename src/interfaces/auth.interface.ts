import { IUser } from "./user.interface";

export interface ILoginResponse {
  user: IUser;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
