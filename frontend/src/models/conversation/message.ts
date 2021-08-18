import { IUser } from '@messaging/models/user';
import { IConversation } from './conversation';

export interface IMessage {
  id: string;
  conversation: IConversation;
  from: string | IUser;
  content: string;
}
