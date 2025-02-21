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
      return patient
        ? await patient!.update(data)
        : null;
    }
  
    async deletePatient(id: number) {
      let resp = false;
      const patient = await Patient.findByPk(id);
      if (patient) {
        await patient!.destroy();
        resp = true;
      }
      return resp;
    }

}