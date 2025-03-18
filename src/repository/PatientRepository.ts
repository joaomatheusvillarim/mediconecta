import { Patient } from "../model/Patient";

export class PatientRepository {

  async createPatient(
    userId: number,
    clinicId: number
  ) {
    return await Patient.create({userId, clinicId});
  }
  
  async getPatientById(
    userId: number,
    clinicId: number
  ) {
    return await Patient.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });
  }
  
  async getAllPatients(clinicId: number) {
    return await Patient.findAll({
      where: {
        clinicId: clinicId,
      }
    });
  }

  async updatePatient(
    userId: number,
    clinicId: number
  ) {
    return null;
  }

  async deletePatient(
    userId: number,
    clinicId: number
  ) {
    let resp = false;
    const patient = await Patient.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });
    if (patient) {
      await patient!.destroy();
      resp = true;
    }
    return resp;
  }

}