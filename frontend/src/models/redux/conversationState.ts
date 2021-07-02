import { IConversation } from '@messaging/models';

export interface IConversationState {
  activeConversation: IConversation | null;
}
