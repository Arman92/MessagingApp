import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

import config from '@messaging/config';

export const ioAuthMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const token = socket.handshake.auth.token;
  let decodedToken: any;

  try {
    decodedToken = jwt.verify(token, config.auth.secret);
  } catch {
    const err = new Error('not authorized');
    (err as any).data = { content: 'You should provide valid accessToken' };
    next(err);
    return;
  }

  // We have successfully verified and extracted the token identity
  Object.assign(socket, {
    userId: decodedToken.identity.userId,
    email: decodedToken.identity.email,
  });

  next();
};
