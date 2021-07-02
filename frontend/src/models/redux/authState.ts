import { IUser } from '@messaging/models';

export interface IAuthState {
  user: IUser | null;
  authInProcess: boolean;
}
