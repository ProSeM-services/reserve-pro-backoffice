import { UserZod } from "./user.interface";

export interface ISession {
  user: UserZod;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
