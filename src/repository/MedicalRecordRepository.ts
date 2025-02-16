import { MedicalRecord, MedicalRecordCreationAttributes } from '../models/MedicalRecord';

class MedicalRecordRepository {
  async findById(id: number): Promise<MedicalRecord | null> {
    return await MedicalRecord.findByPk(id);
  }

  async findAll(): Promise<MedicalRecord[]> {
    return await MedicalRecord.findAll();
  }

  async create(data: MedicalRecordCreationAttributes): Promise<MedicalRecord> {
    return await MedicalRecord.create(data);
  }

  async update(id: number, data: Partial<MedicalRecord>): Promise<MedicalRecord | null> {
    const record = await MedicalRecord.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const record = await MedicalRecord.findByPk(id);
    if (!record) return false;
    await record.destroy();
    return true;
  }
}

export default new MedicalRecordRepository();