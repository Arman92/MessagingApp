import { i18n, TFunction } from 'i18next';
import { IUser } from '@messaging/model';

declare global {
  namespace Express {
    export interface Request {
      context?: {
        userId?: string;
        userEmail?: string;
        isAuthenticated: boolean;
        user: IUser;
        getUser: () => Promise<IUser>;
      };
    }
  }
}
