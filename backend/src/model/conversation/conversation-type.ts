import { Document, Types } from 'mongoose';

import { IUser } from '@messaging/model';
import { ISharedModel } from '@messaging/model/shared-model';

export interface IConversation extends Document {
  title?: string;
  participants: Array<Types.ObjectId> | Array<IUser>;
}

export interface IConversationModel extends IConversation, ISharedModel {}
