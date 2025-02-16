import { Patient } from '../models/Patient';

class PatientService {
  async createPatient(data: Partial<Patient>): Promise<Patient> {
    return await Patient.create(data);
  }

  async getPatientById(id: number): Promise<Patient | null> {
    return await Patient.findByPk(id);
  }

  async updatePatient(id: number, data: Partial<Patient>): Promise<Patient | null> {
    const patient = await Patient.findByPk(id);
    if (!patient) return null;
    return await patient.update(data);
  }

  async deletePatient(id: number): Promise<boolean> {
    const patient = await Patient.findByPk(id);
    if (!patient) return false;
    await patient.destroy();
    return true;
  }
}

export default new PatientService();
