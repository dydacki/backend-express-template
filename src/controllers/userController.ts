import argon2 from 'argon2';
import { Request, Response } from 'express';
import { getLogger } from 'log4js';
import { Types } from 'mongoose';
import { v4 as newId } from 'uuid';
import User from '../models/User';
import { sendEmail, getPasswordResetEmailPayload, getVerificationEmailPayload } from '../shared/mailer';

const logger = getLogger();

const createUser = async (request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
  const { email, userName, password } = request.body;
  const hashedPassword = await argon2.hash(password);

  const user = new User({
    _id: new Types.ObjectId(),
    email,
    userName,
    password: hashedPassword,
  });

  return user
    .save()
    .then((user) => sendEmail(getVerificationEmailPayload(user.email, user._id, user.verificationCode)).then(() => response.status(201).json({ user })))
    .catch((error) => {
      logger.error(JSON.stringify(error));
      if (error.code === 11000) {
        return response.status(409).json({ message: 'User already exists' });
      }
      return response.status(500).json({ error });
    });
};

const verifyUser = async (request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
  const { userId, verificationCode } = request.query;

  const user = await User.findById(userId);
  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  if (user.verified) {
    return response.json({ message: 'User already verified' });
  }

  if (user.verificationCode !== verificationCode) {
    return response.status(400).json({ message: 'Verification codes do not match' });
  }

  user.verified = true;
  user
    .save()
    .then(() => response.status(200).json({ message: 'User verified' }))
    .catch((error) => {
      logger.error(JSON.stringify(error));
      return response.status(500).json({ error });
    });
};

const requestPasswordReset = async (request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
  const { email } = request.body;
  const message = 'If a user with that email is registered you will receive a password reset email';

  const user = await User.findOne({ email });
  if (!user) {
    logger.warn(`Password reset requested for non-existent user with email ${email}`);
    return response.json({ message: message });
  }

  if (!user.verified) {
    return response.json({ message: 'User is not verified' });
  }

  const passwordResetCode = newId();
  user.passwordResetCode = passwordResetCode;
  user
    .save()
    .then(() => sendEmail(getPasswordResetEmailPayload(user.email, user._id, passwordResetCode)).then(() => response.json({ message: message })))
    .catch((error) => {
      logger.error(JSON.stringify(error));
      return response.status(500).json({ error });
    });
};

const resetPassword = async (request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
  const { userId, passwordResetCode } = request.query;
  const { password, _ } = request.body;

  const user = await User.findById(userId);
  if (!user) {
    logger.warn(`Password reset requested for non-existent user with id ${userId}`);
    return response.status(404).json({ message: 'User not found' });
  }

  if (user.passwordResetCode !== passwordResetCode) {
    logger.warn(`Password reset requested for user with id ${userId} but the reset code does not match`);
    return response.status(404).json({ message: 'Could not reset password' });
  }

  user.password = await argon2.hash(password as string);
  user.passwordResetCode = null;
  user
    .save()
    .then(() => response.status(200).json({ message: 'Password reset' }))
    .catch((error) => {
      logger.error(JSON.stringify(error));
      return response.status(500).json({ error });
    });
};

const getCurrentUser = (_: Request, response: Response): Response<any, Record<string, any>> => {
  return response.json(response.locals.user);
};

export { createUser, requestPasswordReset, resetPassword, verifyUser, getCurrentUser };
