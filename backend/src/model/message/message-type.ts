import { Document } from 'mongoose';

import { IUser } from '@messaging/model';
import { ISharedModel } from '@messaging/model/shared-model';

export interface IMessage extends Document {
  title?: string;
  participants: IUser[];
}

export interface IMessageModel extends IMessage, ISharedModel {}
