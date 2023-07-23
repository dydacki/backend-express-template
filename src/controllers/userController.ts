import argon2 from 'argon2';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../models/User';

const createUser = async (request: Request, response: Response) => {
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
    .then((user) => response.status(201).json({ user }))
    .catch((error) => {
      if (error.code === 11000) {
        return response.status(409).json({ message: 'User already exists' });
      }
      return response.status(500).json({ error });
    });
};

export { createUser };
