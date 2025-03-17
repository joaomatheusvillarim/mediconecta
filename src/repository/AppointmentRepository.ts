import { Appointment, AppointmentStatus } from "../model/Appointment";

export class AppointmentRepository {

  async createAppointment(
    clinicId: number,
    patientId: number,
    doctorId: number,
    date: Date,
    insurance: string,
  ) {

    const status = AppointmentStatus.NAOCONFIRMADO;
    return await Appointment.create({
      clinicId,
      patientId,
      doctorId,
      date,
      insurance,
      status
    });
  }
  
  async getAppointmentById(clinicId: number, appointmentId: number) {
    return await Appointment.findOne({
      where: {
        clinicId: clinicId,
        appointmentId: appointmentId,
      },
    });
  }
  
  async getAllAppointments(clinicId: number) {
    return await Appointment.findAll({
      where: {
        clinicId: clinicId,
      },
    });
  }
  
  async updateAppointment(
    clinicId: number,
    appointmentId: number,
    data: Partial<{
      patientId: number,
      doctorId: number,
      date: Date,
      insurance: string,
      status: AppointmentStatus,
    }>
  ) {
    const appointment = await Appointment.findOne({
      where: {
        clinicId: clinicId,
        appointmentId: appointmentId,
      }
    });
    return appointment
      ? await appointment!.update(data)
      : null;
  }
  
  async deleteAppointment(clinicId: number, appointmentId: number) {
    let resp = false;
    const appointment = await Appointment.findOne({
      where: {
        clinicId: clinicId,
        appointmentId: appointmentId,
      }
    });
    if (appointment) {
      await appointment!.destroy();
      resp = true;
    }
    return resp;
  }
}
