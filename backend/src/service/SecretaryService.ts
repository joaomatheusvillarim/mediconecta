import { Secretary } from '../model/Secretary';
import { SecretaryRepository } from '../repository/SecretaryRepository';
import Validations from '../util/Validations';
import { UserService } from './UserService';
import { ClinicService } from './ClinicService';

export class SecretaryService {

  private secretaryRepository: SecretaryRepository;
  private userService: UserService;
  private clinicService: ClinicService;

  constructor(
    userService: UserService,
    clinicService: ClinicService,
    secretaryRepository?: SecretaryRepository
  ) {
    this.userService = userService,
    this.clinicService = clinicService,
    this.secretaryRepository = secretaryRepository || new SecretaryRepository();
  }

  async createSecretary(
    userId: number,
    clinicId: number,
    workingHours: Partial<string>
  ): Promise<Secretary> {
    
    if (! await this.userService.getUserById(userId)) throw new Error("Usuário inexistente.");
    if (! await this.clinicService.getClinicById(clinicId)) throw new Error("Consultório inexistente.");

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
