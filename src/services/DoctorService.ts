import { Doctor } from '../models/Doctor';

class DoctorService {
  async createDoctor(data: Partial<Doctor>): Promise<Doctor> {
    return await Doctor.create(data);
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return await Doctor.findByPk(id);
  }

  async updateDoctor(id: number, data: Partial<Doctor>): Promise<Doctor | null> {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return null;
    return await doctor.update(data);
  }

  async deleteDoctor(id: number): Promise<boolean> {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return false;
    await doctor.destroy();
    return true;
  }
}

export default new DoctorService();
