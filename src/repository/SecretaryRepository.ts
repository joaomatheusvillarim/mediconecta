import { InferCreationAttributes } from "sequelize";
import { Secretary } from "../model/Secretary";

export class PatientRepository {

  async createSecreatary(data: InferCreationAttributes<Secretary>) {
    return await Secretary.create(data);
  }
  
  async getSecretaryById(id: number) {
    return await Secretary.findByPk(id);
  }
  
  async getAllSecreataries() {
    return await Secretary.findAll();
  }

  async updateSecretary(id: number, data: InferCreationAttributes<Secretary>) {
    const secretary = await Secretary.findByPk(id);
    return secretary
      ? await secretary!.update(data)
      : null;
  }

  async deleteSecretary(id: number) {
    let resp = false;
    const secretary = await Secretary.findByPk(id);
    if (secretary) {
      await secretary!.destroy();
      resp = true;
    }
    return resp;
  }

}