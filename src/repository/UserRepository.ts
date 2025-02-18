import { InferCreationAttributes } from 'sequelize';
import { User } from '../model/User'

export class UserRepository {
  
  async createUser(data: InferCreationAttributes<User>) {
    return await User.create(data);
  };

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(id: number, data: InferCreationAttributes<User>) {
    const user = await User.findByPk(id);
    return await user!.update(data);
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);    
    return await user!.destroy();
  }

}