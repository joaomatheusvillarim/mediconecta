import { Appointment, AppointmentCreationAttributes } from '../models/Appointment';

class AppointmentRepository {
  async findById(id: number): Promise<Appointment | null> {
    return await Appointment.findByPk(id);
  }

  async findAll(): Promise<Appointment[]> {
    return await Appointment.findAll();
  }

  async create(data: AppointmentCreationAttributes): Promise<Appointment> {
    return await Appointment.create(data);
  }

  async update(id: number, data: Partial<Appointment>): Promise<Appointment | null> {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return null;
    return await appointment.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return false;
    await appointment.destroy();
    return true;
  }
}

export default new AppointmentRepository();