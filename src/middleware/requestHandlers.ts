import { NextFunction, Request, Response } from 'express';
import { Logger } from 'log4js';

const requestRuleHandler = (request: Request, response: Response, next: NextFunction) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return response.status(200).json({});
  }

  next();
};

const getErrorHandler = (logger: Logger) => (_: Request, response: Response) => {
  let error = new Error('Not found');
  logger.error(error.message);
  response.status(404).json({
    message: error.message,
  });
};

const getLoggingHandler = (logger: Logger) => (request: Request, response: Response, next: NextFunction) => {
  logger.info(`Incoming - METHOD: [${request.method} - URL: ${request.url}] - IP: [${request.socket.remoteAddress}]`);
  response.on('finish', () => {
    logger.info(`Outgoing - METHOD: [${request.method} - URL: ${request.url}] - IP: [${request.socket.remoteAddress}] - STATUS: [${response.statusCode}]`);
  });

  next();
};

export { getErrorHandler, getLoggingHandler, requestRuleHandler };
