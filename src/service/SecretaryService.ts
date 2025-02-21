import { InferCreationAttributes } from 'sequelize';
import { Secretary } from '../model/Secretary';
import { SecretaryRepository } from '../repository/SecretaryRepository';

const secretaryRepository = new SecretaryRepository();

class SecretaryService {

  async createSecretary(data: InferCreationAttributes<Secretary>): Promise<Secretary> {
    return await secretaryRepository.createSecretary(data);
  }

  async getSecretaryById(id: number): Promise<Secretary | null> {
    return await secretaryRepository.getSecretaryById(id);
  }

  async getAllSecretarys(): Promise<Secretary[]> {
    return await secretaryRepository.getAllSecretaries();
  }

  async updateSecretary(id: number, data: InferCreationAttributes<Secretary>): Promise<Secretary | null> {
    return await secretaryRepository.updateSecretary(id, data);
  }

  async deleteSecretary(id: number): Promise<boolean> {
    return await secretaryRepository.deleteSecretary(id);
  }
  
}

export default new SecretaryService();