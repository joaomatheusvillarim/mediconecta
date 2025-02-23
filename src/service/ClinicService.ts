import { InferCreationAttributes } from 'sequelize';
import { Clinic } from '../model/Clinic';
import { ClinicRepository } from '../repository/ClinicRepository';

const clinicRepository = new ClinicRepository();

class ClinicService {

  async createClinic(data: InferCreationAttributes<Clinic>): Promise<Clinic> {
    return await clinicRepository.createClinic(data);
  }

  async getClinicById(id: number): Promise<Clinic | null> {
    return await clinicRepository.getClinicById(id);
  }

  async getAllClinics(): Promise<Clinic[]> {
    return await clinicRepository.getAllClinics();
  }

  async updateClinic(id: number, data: InferCreationAttributes<Clinic>): Promise<Clinic | null> {
    return await clinicRepository.updateClinic(id, data);
  }

  async deleteClinic(id: number): Promise<boolean> {
    return await clinicRepository.deleteClinic(id);
  }
  
}

export default new ClinicService();
