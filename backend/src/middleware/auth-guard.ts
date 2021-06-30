import { Request, Response, NextFunction } from 'express';

import { UnAuthorizedError } from '@messaging/api/api-errors';

export const authGuard = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { isAuthenticated } = req.context;

  if (isAuthenticated) {
    req.context.user = await req.context.getUser();
    next();
  } else {
    return next(
      new UnAuthorizedError(
        'Unauthorized, this resource needs valid authentication header.'
      )
    );
  }
};
