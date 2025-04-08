import { Clinic } from "../model/Clinic";

export class ClinicRepository {

  async createClinic(
    adminId: number,
    name: string,
    address: string,
    workingHours: string,
    specialties: string,
    phone: string,
    email: string
  ) {
    return await Clinic.create({
      adminId,
      name,
      address,
      workingHours,
      specialties,
      phone,
      email
    });
  }
  
  async getClinicById(id: number) {
    return await Clinic.findByPk(id);
  }
  
  async getAllClinics() {
    return await Clinic.findAll();
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
      email: string
    }>) {
    const clinic = await Clinic.findByPk(id);
    return clinic
      ? await clinic!.update(data)
      : null;
  }
  
  async deleteClinic(id: number) {
    let resp = false;
    const clinic = await Clinic.findByPk(id);
    if (clinic) {
      await clinic!.destroy();
      resp = true;
    }
    return resp;
  }
}
