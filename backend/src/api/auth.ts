import { Router, Request, Response, NextFunction } from 'express';

import { User } from '@messaging/model';
import { NotFoundError, UserInputError } from './api-errors';
import { comparePassword } from '@messaging/utils';
import { createAuthTokens } from '@messaging/utils/authentication';
import { emailRegex, usernameRegex } from '@messaging/utils/regex';
import config from '@messaging/config';

const authRouter = Router();

/* User Login endpoint */
authRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { emailOrUsername, password } = req.body;

      // first check if user exists
      let user = await User.getUserByEmail(emailOrUsername.toLowerCase());
      if (!user) {
        user = await User.getUserByUsername(emailOrUsername.toLowerCase());

        if (!user) {
          return next(new NotFoundError('User not found'));
        }
      }

      // compare password
      const isEqual = await comparePassword(password, user.password);
      if (!isEqual) {
        return next(new UserInputError('Incorrect username or password'));
      }

      // Generate jwt accessToken and refreshToken
      const [accessToken, refreshToken, accessTokenExpireDate] =
        await createAuthTokens(
          { userId: user.id, email: user.email },
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

authRouter.post(
  '/signup',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, username, password } = req.body;

      // Check if username is valid (no spaces, no special characters)
      if (!usernameRegex.test(username)) {
        return next(
          new UserInputError('Invalid user name', {
            description:
              'Username should only consist of letters and numbers. No spaces allowed. Min length: 4',
          })
        );
      }

      // Check if email is of valid format.
      if (!emailRegex.test(email)) {
        return next(
          new UserInputError('Invalid email', {
            description:
              'Email should be of valid format: someone@somewhere.com',
          })
        );
      }

      // Check if user already exists
      let user =
        (await User.getUserByUsername(username)) ||
        (await User.getUserByEmail(email));
      if (user) {
        return next(
          new UserInputError('User Already exists', {
            description:
              'A user with this email/username already exists. Login instead.',
          })
        );
      }

      // Create user in database and save password in hashed format.
      user = await User.createUser({
        email,
        username,
        name: name,
        password: password,
      });

      // Generate jwt accessToken and refreshToken
      const [accessToken, refreshToken, accessTokenExpireDate] =
        await createAuthTokens(
          { userId: user.id, email: user.email },
          config.auth.secret,
          config.auth.secret + user.password
        );

      res.status(200).send({
        accessToken,
        refreshToken,
        accessTokenExpireDate,
        user,
      });
    } catch (err) {
      next(err);
    }
  }
);

export { authRouter };
