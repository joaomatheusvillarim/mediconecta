import { InferCreationAttributes } from 'sequelize';
import { Patient } from '../model/Patient';
import { PatientRepository } from '../repository/PatientRepository';

const patientRepository = new PatientRepository();

class PatientService {

  async createPatient(data: InferCreationAttributes<Patient>): Promise<Patient> {
    return await patientRepository.createPatient(data);
  }

  async getPatientById(id: number): Promise<Patient | null> {
    return await patientRepository.getPatientById(id);
  }

  async getAllPatients(): Promise<Patient[]> {
    return await patientRepository.getAllPatients();
  }

  async updatePatient(id: number, data: InferCreationAttributes<Patient>): Promise<Patient | null> {
    return await patientRepository.updatePatient(id, data);
  }

  async deletePatient(id: number): Promise<boolean> {
    return await patientRepository.deletePatient(id);
  }
  
}

export default new PatientService();