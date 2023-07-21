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

configureLogging();
const logger = getLogger();

const startServer = () => {
  const app = express()
    // logging incoming requests
    .use((request, response, next) => {
      logger.info(`Incoming - METHOD: [${request.method} - URL: ${request.url}] - IP: [${request.socket.remoteAddress}]`);
      response.on('finish', () => {
        logger.info(`Outgoing - METHOD: [${request.method} - URL: ${request.url}] - IP: [${request.socket.remoteAddress}] - STATUS: [${response.statusCode}]`);
      });

      next();
    })
    // rules for incoming requests
    .use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});
      }

      next();
    })
    // handling errors
    .use((request, response, next) => {
      let error = new Error('Not found');
      logger.error(error.message);
      response.status(404).json({
        message: error.message,
      });
    })
    .use(express.urlencoded({ extended: true }))
    .use(express.json());

  http.createServer(app).listen(config.server.port, () => logger.info(`Server running on port ${config.server.port}`));
};

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    logger.info('Connected to Mongo instance.');
    startServer();
  })
  .catch((err: Error) => logger.error('Could not connect to Mongo instance: ', err));
