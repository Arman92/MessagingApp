import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const createMockDatabase = async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export const clearMockDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export const dropMockDatabase = async () => {
  await mongoose.connection.dropDatabase();
};
