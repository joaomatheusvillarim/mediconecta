import { InferCreationAttributes } from 'sequelize';
import { Doctor } from '../model/Doctor';
import { DoctorRepository } from '../repository/DoctorRepository';

const doctorRepository = new DoctorRepository();

class DoctorService {

  async createDoctor(data: InferCreationAttributes<Doctor>): Promise<Doctor> {
    return await doctorRepository.createDoctor(data);
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return await doctorRepository.getDoctorById(id);
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return await doctorRepository.getAllDoctors();
  }

  async updateDoctor(id: number, data: InferCreationAttributes<Doctor>): Promise<Doctor | null> {
    return await doctorRepository.updateDoctor(id, data);
  }

  async deleteDoctor(id: number): Promise<boolean> {
    return await doctorRepository.deleteDoctor(id);
  }
  
}

export default new DoctorService();