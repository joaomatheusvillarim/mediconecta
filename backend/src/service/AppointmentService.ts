import { Appointment, AppointmentStatus } from '../model/Appointment';
import { AppointmentRepository } from '../repository/AppointmentRepository';
import Validations from '../util/Validations';

export class AppointmentService {

  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository?: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository || new AppointmentRepository();
  }

  async createAppointment(
    clinicId: number,
    patientId: number,
    doctorId: number,
    date: Date,
    insurance: string,
  ): Promise<Appointment> {

    Validations.validateBirthday(date);
    Validations.validateInsurance(insurance);
    
    return await this.appointmentRepository.createAppointment(
      clinicId,
      patientId,
      doctorId,
      date,
      insurance
    );
  }

  async getAppointmentById(clinicId: number, appointmentId: number): Promise<Appointment | null> {
    return await this.appointmentRepository.getAppointmentById(clinicId, appointmentId);
  }

  async getAllAppointments(clinicId: number): Promise<Appointment[]> {
    return await this.appointmentRepository.getAllAppointments(clinicId);
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
  ): Promise<Appointment | null> {

    if (data.date) Validations.validateBirthday(data.date);
    if (data.insurance) Validations.validateInsurance(data.insurance);
    if (data.status) Validations.validateAppointmentStatus(data.status);

    return await this.appointmentRepository.updateAppointment(
      clinicId,
      appointmentId,
      data
    );
  }

  async deleteAppointment(clinicId: number, appointmentId: number): Promise<boolean> {
    return await this.appointmentRepository.deleteAppointment(clinicId, appointmentId);
  }
  
}
