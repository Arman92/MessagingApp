import { Server as SocketIOServer, Socket } from 'socket.io';

import { ioAuthMiddleware } from '@messaging/middleware/socket-auth';
import log from '@messaging/log';

import { SocketEvent } from './socket-types';
import { getUserIdFromSocket, getUserEmailFromSocket } from './helper';
import {
  handleConnect,
  handleDisconnect,
  handleJoinConversation,
  handleLeaveConversation,
  handleNewMessage,
  handleSeenMessage,
} from './controllers';

export const setupSocketIo = (io: SocketIOServer) => {
  // Gets called whenever a user connects to websocket
  io.on(SocketEvent.Connect, (socket: Socket) => {
    log.verbose(
      `New client connected on socket, userId: ${getUserIdFromSocket(
        socket
      )}, email: ${getUserEmailFromSocket(socket)}`
    );

    io.on('connection', (sc) => {
      handleJoinConversation(sc);
    });

    handleConnect(socket);
    handleNewMessage(socket);
    handleSeenMessage(socket);
    handleDisconnect(socket);
    handleLeaveConversation(socket);
  });

  io.use(ioAuthMiddleware);
};
