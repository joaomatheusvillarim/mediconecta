import { Doctor } from '../model/Doctor';
import { DoctorRepository } from '../repository/DoctorRepository';
import Validations from '../util/Validations';
import { UserService } from './UserService';
import { ClinicService } from './ClinicService';

export class DoctorService {

  private doctorRepository: DoctorRepository;
  private userService: UserService;
  private clinicService: ClinicService;

  constructor(
    userService: UserService,
    clinicService: ClinicService,
    doctorRepository?: DoctorRepository
  ) {
    this.userService = userService,
    this.clinicService = clinicService,
    this.doctorRepository = doctorRepository || new DoctorRepository();
  }

  async createDoctor(
    userId: number,
    clinicId: number,
    credentials: string,
    workingHours: Partial<string>,
    specialty: string,
    insurance: Partial<string>
  ): Promise<Doctor> {

    if (! await this.userService.getUserById(userId)) throw new Error("Usuário inexistente.");
    if (! await this.clinicService.getClinicById(clinicId)) throw new Error("Consultório inexistente.");

    Validations.validateDoctorCredentials(credentials);
    if (workingHours) Validations.validateWorkingHours(workingHours);
    Validations.validateSpecialties(specialty);
    if (insurance) Validations.validateInsurance(insurance);

    return await this.doctorRepository.createDoctor(
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
    return await this.doctorRepository.getDoctorById(userId, clinicId);
  }

  async getAllDoctors(clinicId: number): Promise<Doctor[]> {
    return await this.doctorRepository.getAllDoctors(clinicId);
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
    if (data.credentials) Validations.validateDoctorCredentials(data.credentials);
    if (data.workingHours) Validations.validateWorkingHours(data.workingHours);
    if (data.specialty) Validations.validateSpecialties(data.specialty);
    if (data.insurance) Validations.validateInsurance(data.insurance);

    return await this.doctorRepository.updateDoctor(userId, clinicId, data);
  }

  async deleteDoctor(
    userId: number,
    clinicId: number
  ): Promise<boolean> {
    return await this.doctorRepository.deleteDoctor(userId, clinicId);
  }
  
}
