import express from 'express';
import { getLogger } from 'log4js';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import { config } from './config/envConfig';
import { configureLogging } from './config/log4jsConfig';
import { getErrorHandler, getLoggingHandler, requestRuleHandler } from './middleware/requestHandlers';
import defaultRoutes from './routes/index';
import userRoutes from './routes/user';

configureLogging();
const logger = getLogger();

const startServer = () => {
  const app = express()
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(getLoggingHandler(logger))
    .use(requestRuleHandler)
    .use('/api/users', userRoutes)
    .use('/ping', defaultRoutes)
    .use(getErrorHandler(logger));

  http.createServer(app).listen(config.server.port, () => logger.info(`Server running on port ${config.server.port}`));
};

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    logger.info('Connected to Mongo instance.');
    startServer();
  })
  .catch((err: Error) => {
    logger.error('Could not connect to Mongo instance: ', err);
    process.exit(1);
  });
