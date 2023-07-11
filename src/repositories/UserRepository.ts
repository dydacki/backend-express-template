import { User, UserCredentials } from '../models/User';

interface IUserRepository {
  getUserByEmail(email: string): User;
  createUser(credentials: UserCredentials): User;
}

class UserRepository implements IUserRepository {
  getUserByEmail(email: string): User {
    throw new Error('Method not implemented.');
  }
  createUser(credentials: UserCredentials): User {
    throw new Error('Method not implemented.');
  }
}

export { IUserRepository, UserRepository };
