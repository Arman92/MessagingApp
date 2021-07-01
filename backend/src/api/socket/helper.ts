import { Socket } from 'socket.io';

// TODO: find a way to extend socket.io types to avoid using any
export const getUserIdFromSocket = (socket: Socket) => (socket as any).userId;
export const getUserEmailFromSocket = (socket: Socket) => (socket as any).email;
