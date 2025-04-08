import { Doctor } from '../model/Doctor';
import { DoctorRepository } from '../repository/DoctorRepository';
import Validations from '../util/Validations';

const doctorRepository = new DoctorRepository();

class DoctorService {

  async createDoctor(
    userId: number,
    clinicId: number,
    credentials: string,
    workingHours: Partial<string>,
    specialty: string,
    insurance: Partial<string>
  ): Promise<Doctor> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);
    Validations.validateDoctorCredentials(credentials);
    if (workingHours) Validations.validateWorkingHours(workingHours);
    Validations.validateSpecialties(specialty);
    if (insurance) Validations.validateInsurance(insurance);

    return await doctorRepository.createDoctor(
      userId,
      clinicId,
      credentials,
      workingHours,
      specialty,
      insurance
    );
  }

  async getDoctorById(
    userId: number,
    clinicId: number
  ): Promise<Doctor | null> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);

    return await doctorRepository.getDoctorById(userId, clinicId);
  }

  async getAllDoctors(clinicId: number): Promise<Doctor[]> {
    
    Validations.validateClinicId(clinicId);

    return await doctorRepository.getAllDoctors(clinicId);
  }

  async updateDoctor(
    userId: number,
    clinicId: number,
    data: Partial<{
      credentials: string,
      workingHours: string,
      specialty: string,
      insurance: string
    }>
  ): Promise<Doctor | null> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);

    if (data.credentials) Validations.validateDoctorCredentials(data.credentials);
    if (data.workingHours) Validations.validateWorkingHours(data.workingHours);
    if (data.specialty) Validations.validateSpecialties(data.specialty);
    if (data.insurance) Validations.validateInsurance(data.insurance);

    return await doctorRepository.updateDoctor(userId, clinicId, data);
  }

  async deleteDoctor(
    userId: number,
    clinicId: number
  ): Promise<boolean> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);

    return await doctorRepository.deleteDoctor(userId, clinicId);
  }
  
}

export default new DoctorService();