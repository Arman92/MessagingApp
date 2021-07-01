import { Socket } from 'socket.io';

import log from '@messaging/log';
import { Message } from '@messaging/model';
import {
  SocketEvent,
  NewMessagePayload,
  SeenMessagePayload,
} from './socket-types';
import { getUserIdFromSocket } from './helper';

// Handle new connection from a client
export const handleConnect = (socket: Socket) => {
  // Let everyone know that this user went offline
  socket.emit(SocketEvent.UserOnlineStatus, {
    userId: getUserIdFromSocket(socket),
    isOnline: true,
  });
};

// Joins the client socket into the room specified for this particular conversation
export const handleJoinConversation = (socket: Socket) => {
  socket.on(SocketEvent.JoinConversation, (conversationId: string) => {
    // TODO: check if user is allowed to listen to this conversation (by checking participant in db)
    socket.join(conversationId);
  });
};

// Removes the client socket from the room specified for this particular conversation
export const handleLeaveConversation = (socket: Socket) => {
  socket.on(SocketEvent.LeaveConversation, (conversationId: string) => {
    socket.leave(conversationId);
  });
};

// Triggered upon receiving a new message from a participant
export const handleNewMessage = (socket: Socket) => {
  socket.on(SocketEvent.NewMessage, (payload: NewMessagePayload) => {
    const fromUserId = getUserIdFromSocket(socket);

    log.verbose(`Received NewMessage from ${fromUserId}`, payload);

    Message.createMessage({
      ...payload,
      fromUserId,
    }).then((newMessage) => {
      // Broadcast this new message to user(s) listening to the `conversationId`
      socket
        .to(payload.conversationId)
        .emit(SocketEvent.NewMessage, newMessage);
    });
  });
};

// Handle Seen flag sent from a participant in conversation, notifies other participant that this message
// has been seen by this user.
export const handleSeenMessage = (socket: Socket) => {
  socket.on(SocketEvent.SeenMessage, (payload: SeenMessagePayload) => {
    const seenByUserId = getUserIdFromSocket(socket);

    // Broadcast this new message to user(s) listening to the `conversationId`
    socket
      .to(payload.conversationId)
      .emit(SocketEvent.SeenMessage, { seenByUserId, ...payload });
  });
};

// Handles client websocket disconnect
export const handleDisconnect = (socket: Socket) => {
  socket.on(SocketEvent.Disconnect, () => {
    // TODO: maybe set user status as disconnected/offline

    // Let everyone know that this user went offline
    socket.emit(SocketEvent.UserOnlineStatus, {
      userId: getUserIdFromSocket(socket),
      isOnline: false,
    });
  });
};
