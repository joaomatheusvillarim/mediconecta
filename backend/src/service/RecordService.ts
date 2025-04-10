import { Record } from '../model/Record';
import { RecordRepository } from '../repository/RecordRepository';
import Validations from '../util/Validations';

export class RecordService {

  private recordRepository: RecordRepository;

  constructor(recordRepository?: RecordRepository) {
    this.recordRepository = recordRepository || new RecordRepository();
  }

  async createRecordEntry(
    userId: number,
    clinicId: number,
    content: string
  ): Promise<Record | null> {

    Validations.validateRecordEntryContent(content);

    return await this.recordRepository.createRecordEntry(
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
    return await this.recordRepository.getRecordEntryByIndex(userId, clinicId, index);
  }

  async getAllRecordEntries(
    userId: number,
    clinicId: number,
  ): Promise<Record | null> {
    return await this.recordRepository.getAllRecordEntries(userId, clinicId);
  }

  async updateRecordEntry(
    userId: number,
    clinicId: number,
    index: number,
    content: string
  ): Promise<Record | null> {

    Validations.validateRecordEntryContent(content);

    return await this.recordRepository.updateRecordEntry(userId, clinicId, index, content);
  }

  async deleteRecordEntry(
    userId: number,
    clinicId: number,
    index: number
  ): Promise<boolean> {
    return await this.recordRepository.deleteRecordEntry(userId, clinicId, index);
  }
  
}
