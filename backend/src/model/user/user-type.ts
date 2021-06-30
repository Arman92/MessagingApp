import { Document } from 'mongoose';
import { ISharedModel } from '@messaging/model/shared-model';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password?: string;
}

export interface IUserModel extends IUser, ISharedModel {}
