import { IUser } from '@messaging/models';

export interface IConversation {
  id: string;
  title: string;
  participants: IUser[];
}
