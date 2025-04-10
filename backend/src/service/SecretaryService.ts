import { Secretary } from '../model/Secretary';
import { SecretaryRepository } from '../repository/SecretaryRepository';
import Validations from '../util/Validations';

export class SecretaryService {

  private secretaryRepository: SecretaryRepository;

  constructor(secretaryRepository?: SecretaryRepository) {
    this.secretaryRepository = secretaryRepository || new SecretaryRepository();
  }

  async createSecretary(
    userId: number,
    clinicId: number,
    workingHours: Partial<string>
  ): Promise<Secretary> {
    
    if (workingHours) Validations.validateWorkingHours(workingHours);

    return await this.secretaryRepository.createSecretary(
      userId,
      clinicId,
      workingHours
    );
  }

  async getSecretaryById(
    userId: number,
    clinicId: number
  ): Promise<Secretary | null> {
    return await this.secretaryRepository.getSecretaryById(userId, clinicId);
  }

  async getAllSecretaries(clinicId: number): Promise<Secretary[]> {
    return await this.secretaryRepository.getAllSecretaries(clinicId);
  }

  async updateSecretary(
    userId: number,
    clinicId: number,
    data: Partial<{
      workingHours: string,
    }>
  ): Promise<Secretary | null> {
        
    if (data.workingHours) Validations.validateWorkingHours(data.workingHours);
    
    return await this.secretaryRepository.updateSecretary(userId, clinicId, data);
  }

  async deleteSecretary(
    userId: number, 
    clinicId: number
  ): Promise<boolean> {    
    return await this.secretaryRepository.deleteSecretary(userId, clinicId);
  }
}
