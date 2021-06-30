import config from '@iam/config';
import appRootPath from 'app-root-path';
import winston from 'winston';

const options = {
  file: {
    level: config.log.file.level,
    filename: `${appRootPath}/logs/app.log`,
    handleExceptions: true,
    json: config.log.file.json,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: config.log.console.level,
    handleExceptions: true,
    json: config.log.console.json,
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export const customLogStream = {
  write(message: string) {
    logger.info(message);
  },
};

export default logger;
