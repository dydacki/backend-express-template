import express from 'express';
import { getLogger } from 'log4js';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { connectToDatabase } from './mongo';
import { config } from './config/envConfig';
import { configureLogging } from './config/log4jsConfig';
import deserializeUser from './middleware/deserializationHandler';
import { getErrorHandler, getLoggingHandler, requestRuleHandler } from './middleware/requestHandlers';
import defaultRoutes from './routes/index';
import userRoutes from './routes/user';
import authenticationRoutes from './routes/authentication';

configureLogging();
const logger = getLogger();

const startServer = () => {
  const app = express()
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(deserializeUser)
    .use(getLoggingHandler(logger))
    .use(requestRuleHandler)
    .use('/api/auth', authenticationRoutes)
    .use('/api/users', userRoutes)
    .use('/ping', defaultRoutes)
    .use(getErrorHandler(logger));

  http.createServer(app).listen(config.server.port, () => logger.info(`Server running on port ${config.server.port}`));
};

connectToDatabase()
  .then(() => {
    logger.info('Connected to Mongo instance.');
    startServer();
  })
  .catch((err: Error) => {
    logger.error('Could not connect to Mongo instance: ', err);
    process.exit(1);
  });
