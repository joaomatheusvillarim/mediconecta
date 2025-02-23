import { InferCreationAttributes } from 'sequelize';
import { User } from '../model/User'

export class UserRepository {
  
  async createUser(data: InferCreationAttributes<User>) {
    return await User.create(data);
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(id: number, data: InferCreationAttributes<User>) {
    const user = await User.findByPk(id);
    return user
      ? await user!.update(data)
      : null;
  }

  async deleteUser(id: number) {
    let resp = false;
    const user = await User.findByPk(id);
    if (user) {
      await user!.destroy();
      resp = true;
    }
    return resp;
  }

}