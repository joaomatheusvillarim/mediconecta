import { Patient, PatientCreationAttributes } from '../models/Patient';

class PatientRepository {
  async findById(id: number): Promise<Patient | null> {
    return await Patient.findByPk(id);
  }

  async findAll(): Promise<Patient[]> {
    return await Patient.findAll();
  }

  async create(data: PatientCreationAttributes): Promise<Patient> {
    return await Patient.create(data);
  }

  async update(id: number, data: Partial<Patient>): Promise<Patient | null> {
    const patient = await Patient.findByPk(id);
    if (!patient) return null;
    return await patient.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const patient = await Patient.findByPk(id);
    if (!patient) return false;
    await patient.destroy();
    return true;
  }
}

export default new PatientRepository();
