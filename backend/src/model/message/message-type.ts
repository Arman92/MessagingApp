import { Document, Types } from 'mongoose';

import { IConversation } from '@messaging/model';
import { ISharedModel } from '@messaging/model/shared-model';
import { IUser } from 'model/user';

export interface IMessage extends Document {
  conversation: Types.ObjectId | IConversation;
  from: Types.ObjectId | IUser;
  content: string;
}

export interface IMessageModel extends IMessage, ISharedModel {}
