import { InferCreationAttributes } from "sequelize";
import { Doctor } from "../model/Doctor";

export class DoctorRepository {

  async createDoctor(data: InferCreationAttributes<Doctor>) {
      return await Doctor.create(data);
  }
  
  async getDoctorById(id: number) {
      return await Doctor.findByPk(id);
  }
  
  async getAllDoctors() {
      return await Doctor.findAll();
  }
  
  async updateDoctor(id: number, data: InferCreationAttributes<Doctor>) {
      const doctor = await Doctor.findByPk(id);
      return doctor
        ? await doctor!.update(data)
        : null;
  }
  
  async deleteDoctor(id: number) {
      let resp = false;
      const doctor = await Doctor.findByPk(id);
      if (doctor) {
          await doctor!.destroy();
          resp = true;
      }
      return resp;
  }
}