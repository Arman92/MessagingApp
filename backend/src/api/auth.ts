import { Router, Request, Response, NextFunction } from 'express';

import { User } from '@messaging/model';
import config from '@messaging/config';
import { NotFoundError, UserInputError } from './api-errors';
import { comparePassword } from '@messaging/utils';
import { createAuthTokens } from '@messaging/utils/authentication';

const authRouter = Router();

/* User Login endpoint */
authRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { emailOrUsername, password } = req.body;

      let user = await User.getUserByEmail(emailOrUsername.toLowerCase());
      if (!user) {
        user = await User.getUserByUsername(emailOrUsername.toLowerCase());
        if (!user) {
          next(new NotFoundError('User not found'));
        }
      }

      const isEqual = await comparePassword(password, user.password);
      if (!isEqual) {
        next(new UserInputError('Incorrect username or password'));
      }

      const [accessToken, refreshToken, accessTokenExpireDate] =
        await createAuthTokens(
          { userId: user.id, email_cellphone: user.email },
          config.auth.secret,
          config.auth.secret + user.password
        );

      res.status(200).send({
        accessTokenExpireDate,
        accessToken,
        refreshToken,
        user,
      });
    } catch (err) {
      next(err);
    }
  }
);
