import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import factory from 'factory-girl';
import { IUserModel } from 'model';

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

export const createMockUser = async () => {
  const user: IUserModel = await factory.build('user');
  const password = user.password;

  return { user: await user.save(), password };
};
