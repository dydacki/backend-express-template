import { User, UserCredentials } from '../models/User';

export interface IUserRepository {
  getUserByEmail(email: string): User;
  createUser(credentials: UserCredentials): User;
}
