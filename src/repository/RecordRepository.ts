import { Record } from '../model/Record'

export class RecordRepository {
  
  async createRecordEntry(
    userId: number,
    clinicId: number,
    content: string
  ) {

    const record = await Record.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      },
    });

    if (record) {
      record.entries = [...record.entries, content];
      await record.save();
    }

    return record;
  }

  async getRecordEntryByIndex(
    userId: number,
    clinicId: number,
    index: number,
  ) {

    const record = await Record.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });

    return record
      ? record!.entries[index]
      : null;
  }

  async getAllRecordEntries(
    userId: number,
    clinicId: number
  ) {
    const record = await Record.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });

    return record;
  }

  async updateRecordEntry(
    userId: number,
    clinicId: number,
    index: number,
    content: string
  ) {

    const record = await Record.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });

    if (record && record.entries[index]) {
      record.entries[index] = content;
      await record.save();
    }

    return record;
  }

  async deleteRecordEntry(
    userId: number,
    clinicId: number,
    index: number
  ) {
    let resp = false;

    const record = await Record.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      }
    });

    if (record && record.entries[index]) {
      record.entries.splice(index, 1);
      await record.save();
      resp = true;
    }

    return resp;

  }

}