import { User, UserCredentials } from 'assets/interfaces/models/User';
import { IUserRepository } from 'assets/interfaces/repositories/IUserRepository';

class UserRepository implements IUserRepository {
  getUserByEmail(email: string): User {
    throw new Error('Method not implemented.');
  }
  createUser(credentials: UserCredentials): User {
    throw new Error('Method not implemented.');
  }
}

export { UserRepository };
