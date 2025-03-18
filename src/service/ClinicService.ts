import { Clinic } from '../model/Clinic';
import { ClinicRepository } from '../repository/ClinicRepository';
import Validations from '../util/Validations';
import UserService from './UserService';

const clinicRepository = new ClinicRepository();

class ClinicService {

  async createClinic(
    adminId: number,
    name: string,
    address: string,
    workingHours: string,
    specialties: string,
    phone: string,
    email: string,
  ): Promise<Clinic> {

    if (! await UserService.getUserById(adminId)) {
      throw new Error("O administrador do consultório deve ter um ID válido.");
    }
    
    Validations.validateName(name);
    Validations.validateAddress(address);
    Validations.validateWorkingHours(workingHours);
    Validations.validateSpecialties(specialties);
    Validations.validatePhone(phone);
    Validations.validateEmail(email);

    return await clinicRepository.createClinic(
      adminId,
      name,
      address,
      workingHours,
      specialties,
      phone,
      email
    );
  }

  async getClinicById(id: number): Promise<Clinic | null> {
    return await clinicRepository.getClinicById(id);
  }

  async getAllClinics(): Promise<Clinic[]> {
    return await clinicRepository.getAllClinics();
  }

  async updateClinic(
    id: number,
    data: Partial<{
      adminId: number,
      name: string,
      address: string,
      workingHours: string,
      specialties: string,
      phone: string,
      email: string,
    }>
  ): Promise<Clinic | null> {

    if (data.adminId) {
      if (! await UserService.getUserById(data.adminId)) {
        throw new Error("O administrador do consultório deve ter um ID válido.");
      }
    }

    if (data.name) Validations.validateName(data.name);
    if (data.address) Validations.validateAddress(data.address);    
    if (data.workingHours) Validations.validateWorkingHours(data.workingHours);
    if (data.specialties) Validations.validateSpecialties(data.specialties);    
    if (data.phone) Validations.validatePhone(data.phone);
    if (data.email) Validations.validateEmail(data.email);

    return await clinicRepository.updateClinic(id, data);
  }

  async deleteClinic(id: number): Promise<boolean> {
    return await clinicRepository.deleteClinic(id);
  }
  
}

export default new ClinicService();