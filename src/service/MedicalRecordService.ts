import { InferCreationAttributes } from 'sequelize';
import { MedicalRecord } from '../model/Record';
import { MedicalRecordRepository } from '../repository/MedicalRecordRepository';

const medicalRecordRepository = new MedicalRecordRepository();

class MedicalRecordService {

  async createMedicalRecord(data: InferCreationAttributes<MedicalRecord>): Promise<MedicalRecord> {
    return await medicalRecordRepository.createMedicalRecord(data);
  }

  async getMedicalRecordById(id: number): Promise<MedicalRecord | null> {
    return await medicalRecordRepository.getMedicalRecordById(id);
  }

  async getAllMedicalRecords(): Promise<MedicalRecord[]> {
    return await medicalRecordRepository.getAllMedicalRecords();
  }

  async updateMedicalRecord(id: number, data: InferCreationAttributes<MedicalRecord>): Promise<MedicalRecord | null> {
    return await medicalRecordRepository.updateMedicalRecord(id, data);
  }

  async deleteMedicalRecord(id: number): Promise<boolean> {
    return await medicalRecordRepository.deleteMedicalRecord(id);
  }
  
}

export default new MedicalRecordService();