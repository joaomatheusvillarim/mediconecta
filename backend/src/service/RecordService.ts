import { Record } from '../model/Record';
import { RecordRepository } from '../repository/RecordRepository';
import Validations from '../util/Validations';

const recordRepository = new RecordRepository();

class RecordService {

  async createRecordEntry(
    userId: number,
    clinicId: number,
    content: string
  ): Promise<Record | null> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);
    Validations.validateRecordEntryContent(content);

    return await recordRepository.createRecordEntry(
      userId,
      clinicId,
      content
    );
  }

  async getRecordEntryByIndex(
    userId: number,
    clinicId: number,
    index: number
  ): Promise<string | null> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);
    Validations.validateRecordEntryIndex(userId, clinicId, index);

    return await recordRepository.getRecordEntryByIndex(userId, clinicId, index);
  }

  async getAllRecordEntries(
    userId: number,
    clinicId: number,
  ): Promise<Record | null> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);

    return await recordRepository.getAllRecordEntries(userId, clinicId);
  }

  async updateRecordEntry(
    userId: number,
    clinicId: number,
    index: number,
    content: string
  ): Promise<Record | null> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);
    Validations.validateRecordEntryIndex(userId, clinicId, index);
    Validations.validateRecordEntryContent(content);

    return await recordRepository.updateRecordEntry(userId, clinicId, index, content);
  }

  async deleteRecordEntry(
    userId: number,
    clinicId: number,
    index: number
  ): Promise<boolean> {

    Validations.validateUserId(userId);
    Validations.validateClinicId(clinicId);
    Validations.validateRecordEntryIndex(userId, clinicId, index);

    return await recordRepository.deleteRecordEntry(userId, clinicId, index);
  }
  
}

export default new RecordService();