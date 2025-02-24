import { InferCreationAttributes } from 'sequelize';
import { MedicalRecord } from '../model/MedicalRecord'

export class MedicalRecordRepository {
  
  async createMedicalRecord(data: InferCreationAttributes<MedicalRecord>) {
    return await MedicalRecord.create(data);
  }

  async getMedicalRecordById(id: number) {
    return await MedicalRecord.findByPk(id);
  }

  async getAllMedicalRecords() {
    return await MedicalRecord.findAll();
  }

  async updateMedicalRecord(id: number, data: InferCreationAttributes<MedicalRecord>) {
    const medicalRecord = await MedicalRecord.findByPk(id);
    return medicalRecord
      ? await medicalRecord!.update(data)
      : null;
  }

  async deleteMedicalRecord(id: number) {
    let resp = false;
    const medicalRecord = await MedicalRecord.findByPk(id);
    if (medicalRecord) {
      await MedicalRecord!.destroy();
      resp = true;
    }
    return resp;
  }

}