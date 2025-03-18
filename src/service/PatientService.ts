import { Patient } from '../model/Patient';
import { PatientRepository } from '../repository/PatientRepository';
import Validations from '../util/Validations';

const patientRepository = new PatientRepository();

class PatientService {

  async createPatient(
    userId: number,
    clinicId: number
  ): Promise<Patient> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);

    return await patientRepository.createPatient(userId, clinicId);
  }

  async getPatientById(
    userId: number,
    clinicId: number
  ): Promise<Patient | null> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);

    return await patientRepository.getPatientById(userId, clinicId);
  }

  async getAllPatients(clinicId: number): Promise<Patient[]> {

    Validations.validateClinicId(clinicId);

    return await patientRepository.getAllPatients(clinicId);
  }

  async updatePatient(
    userId: number,
    clinicId: number
  ): Promise<null> {
    return await patientRepository.updatePatient(userId, clinicId);
  }

  async deletePatient(
    userId: number,
    clinicId: number
  ): Promise<boolean> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);

    return await patientRepository.deletePatient(userId, clinicId);
  }
  
}

export default new PatientService();