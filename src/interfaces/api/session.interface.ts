import { IAPIUser } from "./user.interface";

export interface ISession {
  user: IAPIUser;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
