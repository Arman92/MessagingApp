import { IUser } from '@messaging/models';

export interface IAuthState {
  authInProcess: boolean;
  user: IUser | null;
  accessToken: string;
  refreshToken: string;
}
