import { Request, Response, NextFunction } from 'express';

export const contextMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  req.context = {} as any;
  next();
};
