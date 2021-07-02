import { IConversation } from '@messaging/models';

// List Conversations
export type ConversationListReqResponse = IConversation[];

// Start Conversation
export type StartConversationReqParams = {
  title?: string;
  usernameOrEmail: string;
};
export type StartConversationReqResponse = IConversation;
