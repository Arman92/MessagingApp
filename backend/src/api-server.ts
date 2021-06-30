import morgan from 'morgan';
import express from 'express';
import cors from 'cors';

import config from '@messaging/config';
import { customLogStream } from '@messaging/log';
import { errorHandlerMiddleware } from '@messaging/middleware/error-handler';

const server = express();

// In case we are behind something like NGinx and we want to trust the https connections coming from it.
server.set('trust proxy', 1); // trust first proxy

server.use(
  cors({
    origin: (origin: string, callback: any) => {
      const whiteList = config.app.corsWhiteList;
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (!whiteList.split(',').includes(origin)) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// parse application/x-www-form-urlencoded
server.use(
  express.urlencoded({
    extended: true,
  })
);

// Enable Body Parser middleware to parse payloads automatically
server.use(
  express.json({
    limit: '2mb',
  })
);

// Enable HTTP logger if enabled
if (config.log.morgan.enabled) {
  server.use((req, res, next) => {
    // If enabled, add the HTTP requests logging middleware (Morgan)
    morgan(config.log.morgan.level, { stream: customLogStream })(
      req,
      res,
      next
    );
  });
}

server.use(errorHandlerMiddleware);

export default server;
