import argon2 from 'argon2';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { getLogger } from 'log4js';
import SessionModel from '../models/Session';
import UserModel, { privateFields } from '../models/User';
import { signAccessToken, signRefreshToken } from '../shared/jwt';

const logger = getLogger();

const login = async (request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
  const { login, password } = request.body;
  const errorMessage: string = 'Invalid login or password';
  const user = await UserModel.findOne({ email: login });

  if (!user) {
    logger.info(`User not found for ${login}`);
    return response.send({ message: errorMessage });
  }

  if (!user.verified) {
    return response.send({ message: 'Please verify your email' });
  }

  const verified = await argon2.verify(user.password, password);
  logger.info(`Password verified for ${login}`);

  if (!verified) {
    return response.send({ message: errorMessage });
  }

  try {
    const userObject = omit(user, privateFields);
    const accessToken: string = signAccessToken(userObject, { expiresIn: '1h' });
    const session = await SessionModel.create({ userId: user._id });
    const refreshToken: string = signRefreshToken({ session: session._id }, { expiresIn: '1y' });
    logger.info(`Session created successfully for ${login}`);
    return response.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    logger.error(JSON.stringify(error));
    return response.status(500).json({ message: 'Error occurred while attempting to log in a user' });
  }
};

export { login };
