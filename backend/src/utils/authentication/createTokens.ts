import { addDays, addHours, addSeconds, addMinutes } from 'date-fns';
import jwt from 'jsonwebtoken';

import config from '@messaging/config';
import { AuthenticationError } from '@messaging/api/api-errors';

const { authTokenExpiresIn, authRefreshTokenExpiresIn } = config.auth.jwt;

export const createAuthTokens = async (
  identity: { userId: string; email_cellphone: string },
  secret: string,
  refreshSecret: string
) => {
  if (!identity.userId) {
    throw new AuthenticationError('Need userId in identity');
  }

  const createToken: string = jwt.sign({ identity }, secret, {
    expiresIn: authTokenExpiresIn,
  });
  const suffix: string = authTokenExpiresIn.substr(
    authTokenExpiresIn.length - 1,
    1
  );

  const duration: number = parseInt(
    authTokenExpiresIn.substr(0, authTokenExpiresIn.length - 1),
    10
  );
  let accessTokenExpireDate: Date;

  switch (suffix) {
    case 'd':
      accessTokenExpireDate = addDays(new Date(), duration);
      break;
    case 'm':
      accessTokenExpireDate = addMinutes(new Date(), duration);
      break;
    case 's':
      accessTokenExpireDate = addSeconds(new Date(), duration);
      break;
    case 'h':
    default:
      accessTokenExpireDate = addHours(new Date(), duration);
      break;
  }

  const createRefreshToken: string = jwt.sign({ identity }, refreshSecret, {
    expiresIn: authRefreshTokenExpiresIn,
  });

  return Promise.all([createToken, createRefreshToken, accessTokenExpireDate]);
};
