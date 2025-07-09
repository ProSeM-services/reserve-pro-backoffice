import { IAPIUser } from "./user.interface";

export interface ILoginResponse {
  user: IAPIUser;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
