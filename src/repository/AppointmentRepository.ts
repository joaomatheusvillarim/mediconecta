import { InferCreationAttributes } from "sequelize";
import { Appointment } from "../model/Appointment";

export class AppointmentRepository {

  async createAppointment(data: InferCreationAttributes<Appointment>) {
      return await Appointment.create(data);
  }
  
  async getAppointmentById(id: number) {
      return await Appointment.findByPk(id, { include: ['clinic'] });
  }
  
  async getAllAppointments() {
      return await Appointment.findAll({ include: ['clinic'] });
  }
  
  async updateAppointment(id: number, data: InferCreationAttributes<Appointment>) {
      const appointment = await Appointment.findByPk(id);
      return appointment
        ? await appointment!.update(data)
        : null;
  }
  
  async deleteAppointment(id: number) {
      let resp = false;
      const appointment = await Appointment.findByPk(id);
      if (appointment) {
          await appointment!.destroy();
          resp = true;
      }
      return resp;
  }
}
