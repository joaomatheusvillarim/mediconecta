import { Appointment, AppointmentStatus } from '../model/Appointment';
import { AppointmentRepository } from '../repository/AppointmentRepository';
import Validations from '../util/Validations';

const appointmentRepository = new AppointmentRepository();

class AppointmentService {

  async createAppointment(
    clinicId: number,
    patientId: number,
    doctorId: number,
    date: Date,
    insurance: string,
  ): Promise<Appointment> {

    Validations.validateClinicId(clinicId);
    Validations.validatePatientId(patientId, clinicId);
    Validations.validateDoctorId(doctorId, clinicId);
    Validations.validateBirthday(date);
    Validations.validateInsurance(insurance);
    
    return await appointmentRepository.createAppointment(
      clinicId,
      patientId,
      doctorId,
      date,
      insurance
    );
  }

  async getAppointmentById(clinicId: number, appointmentId: number): Promise<Appointment | null> {

    Validations.validateClinicId(clinicId);

    return await appointmentRepository.getAppointmentById(clinicId, appointmentId);
  }

  async getAllAppointments(clinicId: number): Promise<Appointment[]> {

    Validations.validateClinicId(clinicId);

    return await appointmentRepository.getAllAppointments(clinicId);
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

    Validations.validateClinicId(clinicId);

    if (data.patientId) Validations.validatePatientId(data.patientId, clinicId);
    if (data.doctorId) Validations.validateDoctorId(data.doctorId, clinicId);
    if (data.date) Validations.validateBirthday(data.date);
    if (data.insurance) Validations.validateInsurance(data.insurance);
    if (data.status) Validations.validateAppointmentStatus(data.status);

    return await appointmentRepository.updateAppointment(
      clinicId,
      appointmentId,
      data
    );
  }

  async deleteAppointment(clinicId: number, appointmentId: number): Promise<boolean> {
    
    Validations.validateClinicId(clinicId);

    return await appointmentRepository.deleteAppointment(clinicId, appointmentId);
  }
  
}

export default new AppointmentService();
