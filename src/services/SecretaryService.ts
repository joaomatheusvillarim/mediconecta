import { Secretary } from '../models/Secretary';

class SecretaryService {
  async createSecretary(data: Partial<Secretary>): Promise<Secretary> {
    return await Secretary.create(data);
  }

  async getSecretaryById(id: number): Promise<Secretary | null> {
    return await Secretary.findByPk(id);
  }

  async updateSecretary(id: number, data: Partial<Secretary>): Promise<Secretary | null> {
    const secretary = await Secretary.findByPk(id);
    if (!secretary) return null;
    return await secretary.update(data);
  }

  async deleteSecretary(id: number): Promise<boolean> {
    const secretary = await Secretary.findByPk(id);
    if (!secretary) return false;
    await secretary.destroy();
    return true;
  }

  async getAllSecretaries(): Promise<Secretary[]> {
    return await Secretary.findAll();
  }
}

export default new SecretaryService();
