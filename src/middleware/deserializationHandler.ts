import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../shared/jwt';

const deserializeUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const accessToken = (request.headers.authorization || '').replace(/^Bearer\s/, '');

  if (accessToken) {
    const decoded = verifyAccessToken(accessToken);
    if (decoded) {
      response.locals.user = decoded;
    }
  }

  next();
};

export default deserializeUser;
