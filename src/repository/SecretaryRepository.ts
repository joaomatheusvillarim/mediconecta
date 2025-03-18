import { Secretary } from '../model/Secretary';

export class SecretaryRepository {

  async createSecretary(
    userId: number,
    clinicId: number,
    workingHours: Partial<string>
  ) {
    return await Secretary.create({
      userId,
      clinicId,
      workingHours,
    });
  }

  async getSecretaryById(
    userId: number, 
    clinicId: number
  ) {
    return await Secretary.findOne({
      where: {
        userId: userId,
        clinicId: clinicId,
      },
    });
  }

  async getAllSecretaries(clinicId: number) {
    return await Secretary.findAll({
      where: {
        clinicId: clinicId,
      },
    });
  }

  async updateSecretary(
    userId: number,
    clinicId: number,
    data: Partial<{ 
      workingHours: string 
    }>
  ) {
    const secretary = await Secretary.findOne({
      where: { 
        userId: userId, 
        clinicId: clinicId 
      },
    });
    return secretary
      ? await secretary!.update(data)
      : null;
  }

  async deleteSecretary(
    userId: number, 
    clinicId: number
  ) {
    let resp = false;
    const secretary = await Secretary.findOne({
      where: { 
        userId: userId, 
        clinicId: clinicId 
      }
    });
    if (secretary) {
      await secretary!.destroy();
      resp = true;
  }
  return resp;
  }
}