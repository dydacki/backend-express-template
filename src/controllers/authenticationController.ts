import { Request, Response } from 'express';
import { getLogger } from 'log4js';

const logger = getLogger();

const login = async (request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
  logger.info('Login successful');
  return Promise.resolve(response.status(200).json({ message: 'Login successful' }));
};

export { login };
