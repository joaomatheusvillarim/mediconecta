import { Secretary } from '../model/Secretary';
import { SecretaryRepository } from '../repository/SecretaryRepository';
import Validations from '../util/Validations';

const secretaryRepository = new SecretaryRepository();

class SecretaryService {

  async createSecretary(
    userId: number,
    clinicId: number,
    workingHours: Partial<string>
  ): Promise<Secretary> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);
    if (workingHours) Validations.validateWorkingHours(workingHours);

    return await secretaryRepository.createSecretary(
      userId,
      clinicId,
      workingHours
    );
  }

  async getSecretaryById(
    userId: number,
    clinicId: number
  ): Promise<Secretary | null> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);

    return await secretaryRepository.getSecretaryById(userId, clinicId);
  }

  async getAllSecretaries(clinicId: number): Promise<Secretary[]> {

    Validations.validateClinicId(clinicId);

    return await secretaryRepository.getAllSecretaries(clinicId);
  }

  async updateSecretary(
    userId: number,
    clinicId: number,
    data: Partial<{
      workingHours: string,
    }>
  ): Promise<Secretary | null> {
    
    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);
    
    if (data.workingHours) Validations.validateWorkingHours(data.workingHours);
    
    return await secretaryRepository.updateSecretary(userId, clinicId, data);
  }

  async deleteSecretary(
    userId: number, 
    clinicId: number
  ): Promise<boolean> {
    
    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);
    
    return await secretaryRepository.deleteSecretary(userId, clinicId);
  }
}

export default new SecretaryService();