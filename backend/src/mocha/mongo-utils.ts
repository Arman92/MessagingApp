import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import factory from 'factory-girl';

import { IUserModel } from '@messaging/model';
import { createAuthTokens } from '@messaging/utils/authentication';
import config from '@messaging/config';

let mongoServer: MongoMemoryServer;

export const createMockDatabase = async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: true,
  });
};

export const clearMockDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export const dropMockDatabase = async () => {
  await mongoose.connection.dropDatabase();
};

export const createMockDatabaseUser = async () => {
  const user: IUserModel = await factory.build('user');
  const password = user.password;

  return { user: await user.save(), password };
};

export const createMockDatabaseUserAndTokens = async () => {
  const user: IUserModel = await factory.build('user');
  const password = user.password;

  const [accessToken, refreshToken] = await createAuthTokens(
    { userId: user.id, email: user.email },
    config.auth.secret,
    config.auth.secret + user.password
  );

  return { user: await user.save(), password, accessToken, refreshToken };
};

export const createMockUser = async () => {
  const user: IUserModel = await factory.build('user');

  return user;
};
