import { InferCreationAttributes } from 'sequelize';
import { Appointment } from '../model/Appointment';
import { AppointmentRepository } from '../repository/AppointmentRepository';

const appointmentRepository = new AppointmentRepository();

class AppointmentService {

  async createAppointment(data: InferCreationAttributes<Appointment>): Promise<Appointment> {
    return await appointmentRepository.createAppointment(data);
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    return await appointmentRepository.getAppointmentById(id);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return await appointmentRepository.getAllAppointments();
  }

  async updateAppointment(id: number, data: InferCreationAttributes<Appointment>): Promise<Appointment | null> {
    return await appointmentRepository.updateAppointment(id, data);
  }

  async deleteAppointment(id: number): Promise<boolean> {
    return await appointmentRepository.deleteAppointment(id);
  }
  
}

export default new AppointmentService();
