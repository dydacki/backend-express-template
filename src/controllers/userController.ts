import { Request, Response } from 'express';

const createUser = async (request: Request, response: Response) => {
  console.log(request.body);
  response.status(201).json({ message: 'OK' });
};

export { createUser };
