import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '@messaging/config';
import { IUser, User } from '@messaging/model';

export const validateAuthHeader = (
  authHeader: string
): { isAuthenticated: boolean; userId?: string; email?: string } => {
  if (!authHeader) {
    return {
      isAuthenticated: false,
    };
  }

  // We expect the Authorization header value to be in format of 'Bearer AUTH_TOKEN'
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    return {
      isAuthenticated: false,
    };
  }
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, config.auth.secret);
  } catch {
    return {
      isAuthenticated: false,
    };
  }
  if (!decodedToken) {
    return {
      isAuthenticated: false,
    };
  }

  // We have successfully verified and extracted the token identity
  return {
    isAuthenticated: true,
    userId: decodedToken.identity.userId,
    email: decodedToken.identity.email,
  };
};

export default (req: Request, _res: Response, next: NextFunction) => {
  const { context } = req;
  const authHeader = req.get('Authorization');
  const { isAuthenticated, userId, email } = validateAuthHeader(authHeader);

  // we will set some params on express' req And then we can use
  // these info along all our API handlers
  context.isAuthenticated = isAuthenticated;
  context.userId = userId;
  context.userEmail = email;

  context.getUser = async (): Promise<IUser> => {
    if (!context.isAuthenticated) return null;

    if (context.user) {
      return context.user;
    }

    context.user = await User.getUserById(context.userId);
    return context.user;
  };

  next();
};
