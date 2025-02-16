import { User, UserCreationAttributes } from '../models/User';

class UserRepository {
  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  async create(data: UserCreationAttributes): Promise<User> {
    return await User.create(data);
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
}

export default new UserRepository();
