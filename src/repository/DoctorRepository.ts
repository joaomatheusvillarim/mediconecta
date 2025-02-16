import { Doctor, DoctorCreationAttributes } from '../models/Doctor';

class DoctorRepository {
  async findById(id: number): Promise<Doctor | null> {
    return await Doctor.findByPk(id);
  }

  async findAll(): Promise<Doctor[]> {
    return await Doctor.findAll();
  }

  async create(data: DoctorCreationAttributes): Promise<Doctor> {
    return await Doctor.create(data);
  }

  async update(id: number, data: Partial<Doctor>): Promise<Doctor | null> {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return null;
    return await doctor.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return false;
    await doctor.destroy();
    return true;
  }
}

export default new DoctorRepository();
