import { InferCreationAttributes } from "sequelize";
import { Patient } from "../model/Patient";

export class PatientRepository {

  async createPatient(data: InferCreationAttributes<Patient>) {
      return await Patient.create(data);
    };
  
    async getPatientById(id: number) {
      return await Patient.findByPk(id);
    }
  
    async getAllPatients() {
      return await Patient.findAll();
    }
  
    async updatePatient(id: number, data: InferCreationAttributes<Patient>) {
      const patient = await Patient.findByPk(id);
      return await patient!.update(data);
    }
  
    async deletePatient(id: number) {
      const patient = await Patient.findByPk(id);    
      return await patient!.destroy();
    }

}