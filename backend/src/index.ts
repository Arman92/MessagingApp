import dotenv from 'dotenv';
// First of all append .env file contents to environment variables
dotenv.config();

import mongoose from 'mongoose';

import config from '@messaging/config';
import log from '@messaging/log';
import { httpServer } from './api-server';

// Options for MongoDB Database
const mongodbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

let dbURI = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.database}?authSource=admin`;

// If there is atlasURI present, use that instead
if (config.db.atlasURI) {
  dbURI = config.db.atlasURI;
}

log.info(`Connecting to Mongodb via this URI: ${dbURI}`);

// Connect to the mongodb database
mongoose
  .connect(dbURI, mongodbOptions)
  .then(async () => {
    httpServer.listen(config.app.port, () => {
      log.info(`Server ready at http://${config.app.host}:${config.app.port}`);
    });
  })
  .catch((err) => {
    log.error(err);
  });
