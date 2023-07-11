import { IUserRepository } from 'assets/interfaces/repositories/IUserRepository';
import { User, UserCredentials } from '../interfaces/models/User';

class UserController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public CreateUser(credentials: UserCredentials): User {
    return this.userRepository.createUser(credentials);
  }

  public Login(credentials: UserCredentials): User {
    return this.Login(credentials);
  }
}

export { UserController };
