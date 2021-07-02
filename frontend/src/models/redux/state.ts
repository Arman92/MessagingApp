import { IAuthState } from './authState';
import { IConversationState } from './conversationState';

export interface IReduxState {
  auth: IAuthState;
  conversation: IConversationState;
}
