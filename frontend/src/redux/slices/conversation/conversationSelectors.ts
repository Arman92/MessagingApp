import { IReduxState } from '@messaging/models';

export const selectActiveConversation = (state: IReduxState) => state.conversation.activeConversation;
