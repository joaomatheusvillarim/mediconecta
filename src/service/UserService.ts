import { InferCreationAttributes } from 'sequelize';
import { User } from '../model/User';
import { UserRepository } from '../repository/UserRepository';

const userRepository = new UserRepository();

class UserService {

  async createUser(data: InferCreationAttributes<User>): Promise<User> {
    return await userRepository.createUser(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return await userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
  }

  async updateUser(id: number, data: InferCreationAttributes<User>): Promise<User | null> {
    return await userRepository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await userRepository.deleteUser(id);
  }
  
}

export default new UserService();