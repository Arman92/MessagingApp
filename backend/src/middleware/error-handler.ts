import { Request, Response, NextFunction } from 'express';

import log from '@messaging/log';

export const errorHandlerMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  log.error(err); // Log error message in our server's console

  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err); // All HTTP requests must have a response, so let's send back an error with its status code and message
};
