import { Document } from 'mongoose';

import { IUser } from '@messaging/model';
import { ISharedModel } from '@messaging/model/shared-model';

export interface IConversation extends Document {
  title?: string;
  participants: IUser[];
}

export interface IConversationModel extends IConversation, ISharedModel {}
