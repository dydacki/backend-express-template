import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { getLogger, Logger } from 'log4js';

const logger: Logger = getLogger();

const validateBodyResource = (schema: ObjectSchema) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(request.body);
    next();
  } catch (error) {
    logger.error(error.message);
    response.status(422).json({ message: error.message });
  }
};

const validateQueryResource = (schema: ObjectSchema) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(request.query);
    next();
  } catch (error) {
    logger.error(error.message);
    response.status(422).json({ message: error.message });
  }
};

const validateResource = (querySchema: ObjectSchema, bodySchema: ObjectSchema) => async (request: Request, response: Response, next: NextFunction) => {
  querySchema
    .validateAsync(request.query)
    .then(() => bodySchema.validateAsync(request.body))
    .then(() => next())
    .catch((error) => {
      logger.error(error.message);
      response.status(422).json({ message: error.message });
    });
};

export { validateBodyResource, validateQueryResource, validateResource };
