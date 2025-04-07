import { Doctor } from "../model/Doctor";

export class DoctorRepository {

  async createDoctor(
    userId: number,
    clinicId: number,
    credentials: string,
    workingHours: Partial<string>,
    specialty: string,
    insurance: Partial<string>
  ) {
    return await Doctor.create({
      userId,
      clinicId,
      credentials,
      workingHours,
      specialty,
      insurance
    });
  }
  
  async getDoctorById(
    userId: number,
    clinicId: number
  ) {
    return await Doctor.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });
  }
  
  async getAllDoctors(clinicId: number) {
    return await Doctor.findAll({
      where: {
        clinicId: clinicId,
      }
    });
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
  ) {
    const doctor = await Doctor.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });
    return doctor
      ? await doctor!.update(data)
      : null;
  }
  
  async deleteDoctor(
    userId: number,
    clinicId: number
  ) {
    let resp = false;
    const doctor = await Doctor.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });
    if (doctor) {
        await doctor!.destroy();
        resp = true;
    }
    return resp;
  }
  
}