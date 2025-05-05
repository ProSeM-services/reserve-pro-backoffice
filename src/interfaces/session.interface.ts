import { IUser } from "./user.interface";

export interface ISession {
  user: IUser;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
