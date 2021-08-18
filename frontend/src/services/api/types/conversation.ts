import { IConversation, IMessage } from '@messaging/models';

// List Conversations
export type ConversationListReqResponse = IConversation[];

// Start Conversation
export type StartConversationReqParams = {
  title?: string;
  usernameOrEmail: string;
};
export type StartConversationReqResponse = IConversation;

// Get Conversation Messages
export type GetConversationMessagesReqResponse = IMessage[];

// Send Message In conversation
export type SendMessageReqParams = {
  conversationId: string;
  content: string;
};

export type SendMessageReqResponse = IMessage;
