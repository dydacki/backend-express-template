import argon2 from 'argon2';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../models/User';
import { sendEmail, getVerificationEmailPayload } from '../shared/mailer';

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
      if (error.code === 11000) {
        return response.status(409).json({ message: 'User already exists' });
      }
      return response.status(500).json({ error });
    });
};

const verifyUser = async (request: Request, response: Response) => {
  response.status(200).json({ message: 'User verified' });
};

export { createUser, verifyUser };
