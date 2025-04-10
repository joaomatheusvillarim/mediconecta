import { Patient } from '../model/Patient';
import { PatientRepository } from '../repository/PatientRepository';
import Validations from '../util/Validations';

export class PatientService {

  private patientRepository: PatientRepository;

  constructor(patientRepository?: PatientRepository) {
    this.patientRepository = patientRepository || new PatientRepository();
  }

  async createPatient(
    userId: number,
    clinicId: number
  ): Promise<Patient> {
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
