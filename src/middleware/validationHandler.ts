import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { getLogger, Logger } from 'log4js';

const logger: Logger = getLogger();

export const validateResource = (schema: ObjectSchema) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(request.body);
    next();
  } catch (error) {
    logger.error(error.message);
    response.status(422).json({ message: error.message });
  }
};
