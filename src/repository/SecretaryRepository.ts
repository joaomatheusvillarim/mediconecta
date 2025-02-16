import { Secretary, SecretaryCreationAttributes } from '../models/Secretary';

class SecretaryRepository {
  async findById(id: number): Promise<Secretary | null> {
    return await Secretary.findByPk(id);
  }

  async findAll(): Promise<Secretary[]> {
    return await Secretary.findAll();
  }

  async create(data: SecretaryCreationAttributes): Promise<Secretary> {
    return await Secretary.create(data);
  }

  async update(id: number, data: Partial<Secretary>): Promise<Secretary | null> {
    const secretary = await Secretary.findByPk(id);
    if (!secretary) return null;
    return await secretary.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const secretary = await Secretary.findByPk(id);
    if (!secretary) return false;
    await secretary.destroy();
    return true;
  }
}

export default new SecretaryRepository();
