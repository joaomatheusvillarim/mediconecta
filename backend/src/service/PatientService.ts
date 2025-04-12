import { Patient } from '../model/Patient';
import { PatientRepository } from '../repository/PatientRepository';
import { UserService } from './UserService';
import { ClinicService } from './ClinicService';

export class PatientService {

  private patientRepository: PatientRepository;
  private userService: UserService;
  private clinicService: ClinicService;

  constructor(
    userService: UserService,
    clinicService: ClinicService,
    patientRepository?: PatientRepository
  ) {
    this.userService = userService;
    this.clinicService = clinicService;
    this.patientRepository = patientRepository || new PatientRepository();
  }

  async createPatient(
    userId: number,
    clinicId: number
  ): Promise<Patient> {

    if (! await this.userService.getUserById(userId)) throw new Error("Usuário inexistente.");
    if (! await this.clinicService.getClinicById(clinicId)) throw new Error("Consultório inexistente.");

    return await this.patientRepository.createPatient(userId, clinicId);
  }

  async getPatientById(
    userId: number,
    clinicId: number
  ): Promise<Patient | null> {
    return await this.patientRepository.getPatientById(userId, clinicId);
  }

  async getAllPatients(clinicId: number): Promise<Patient[]> {
    return await this.patientRepository.getAllPatients(clinicId);
  }

  async updatePatient(
    userId: number,
    clinicId: number
  ): Promise<null> {
    return await this.patientRepository.updatePatient(userId, clinicId);
  }

  async deletePatient(
    userId: number,
    clinicId: number
  ): Promise<boolean> {
    return await this.patientRepository.deletePatient(userId, clinicId);
  }
  
}
