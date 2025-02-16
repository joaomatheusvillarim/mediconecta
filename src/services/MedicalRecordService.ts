import { MedicalRecord } from '../models/MedicalRecord';

class MedicalRecordService {
  async createMedicalRecord(data: Partial<MedicalRecord>): Promise<MedicalRecord> {
    return await MedicalRecord.create(data);
  }

  async getMedicalRecordById(id: number): Promise<MedicalRecord | null> {
    return await MedicalRecord.findByPk(id);
  }

  async updateMedicalRecord(id: number, data: Partial<MedicalRecord>): Promise<MedicalRecord | null> {
    const record = await MedicalRecord.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  async deleteMedicalRecord(id: number): Promise<boolean> {
    const record = await MedicalRecord.findByPk(id);
    if (!record) return false;
    await record.destroy();
    return true;
  }
}

export default new MedicalRecordService();
