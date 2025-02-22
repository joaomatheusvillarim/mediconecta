import { InferCreationAttributes } from "sequelize";
import { Clinic } from "../model/Clinic";

export class ClinicRepository {

  async createClinic(data: InferCreationAttributes<Clinic>) {
      return await Clinic.create(data);
  }
  
  async getClinicById(id: number) {
      return await Clinic.findByPk(id);
  }
  
  async getAllClinics() {
      return await Clinic.findAll();
  }
  
  async updateClinic(id: number, data: InferCreationAttributes<Clinic>) {
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
