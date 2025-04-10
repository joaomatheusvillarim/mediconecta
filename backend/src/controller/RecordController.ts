import { Request, Response } from 'express';
import { RecordService } from '../service/RecordService';
import { injectable, inject } from "tsyringe";

@injectable()
export class RecordController {

  constructor(@inject(RecordService) private recordService: RecordService) {}

  async createRecordEntry(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);
      const { content } = request.body;

      const record = await this.recordService.createRecordEntry(userId, clinicId, content);
      return response.status(201).json(record);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao criar registro em prontuário" });
    }
  }

  async getRecordEntryByIndex(request: Request, response: Response): Promise<Response> {
    try {

      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);
      const entryIndex = parseInt(request.params.entryIndex);

      const recordEntry = await this.recordService.getRecordEntryByIndex(userId, clinicId, entryIndex);

      return !recordEntry
        ? response.status(404).json({ error: "Registro em prontuário não encontrado" }) 
        : response.status(200).json(recordEntry);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar registro em prontuário" });
    }
  }

  async getAllRecordEntries(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const record = await this.recordService.getAllRecordEntries(userId, clinicId);
      return response.status(200).json(record);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar prontuário" });
    }
  }

  async updateRecord(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);
      const entryIndex = parseInt(request.params.entryIndex);
      const { content } = request.body;

      const record = await this.recordService.updateRecordEntry(userId, clinicId, entryIndex, content);
      return !record
        ? response.status(404).json({ error: "Registro em prontuário não encontrado." })
        : response.status(200).json(record);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar registro em prontuário." });
    }
  }

  async deleteRecordEntry(request: Request, response: Response): Promise<Response> {
    try {

      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);
      const entryIndex = parseInt(request.params.entryIndex);

      const success = await this.recordService.deleteRecordEntry(userId, clinicId, entryIndex);
      return !success
        ? response.status(404).json({ error: 'prontuário não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir prontuário' });
    }
  }
}
