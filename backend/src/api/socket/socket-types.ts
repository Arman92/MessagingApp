export enum SocketEvent {
  Connect = 'connect',
  Disconnect = 'disconnect',
  NewMessage = 'newMessage',
  SeenMessage = 'seenMessage',
  UserOnlineStatus = 'userOnlineStatus',
  JoinConversation = 'joinConversation',
  LeaveConversation = 'leaveConversation',
}

export type NewMessagePayload = {
  conversationId: string;
  content: string;
};

export type SeenMessagePayload = {
  conversationId: string;
  messageId: string;
};
