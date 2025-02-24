import { Request, Response } from 'express';
import MedicalRecordService from '../service/MedicalRecordService';

class MedicalRecordController {

  async createMedicalRecord(request: Request, response: Response): Promise<Response> {
    try {
      const medicalRecord = await MedicalRecordService.createMedicalRecord(request.body);
      return response.status(201).json(medicalRecord);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar prontuário' });
    }
  }

  async getMedicalRecordById(request: Request, response: Response): Promise<Response> {
    try {
      const medicalRecord = await MedicalRecordService.getMedicalRecordById(parseInt(request.params.id));
      return !medicalRecord 
        ? response.status(404).json({ error: 'Prontuário não encontrado' }) 
        : response.status(200).json(medicalRecord);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar prontuário' });
    }
  }

  async getAllMedicalRecords(response: Response): Promise<Response> {
    try {
      const medicalRecords = await MedicalRecordService.getAllMedicalRecords();
      return response.status(200).json(medicalRecords);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar prontuários' });
    }
  }

  async updateMedicalRecord(request: Request, response: Response): Promise<Response> {
    try {
      const medicalRecord = await MedicalRecordService.updateMedicalRecord(parseInt(request.params.id), request.body);
      return !medicalRecord
        ? response.status(404).json({ error: 'Prontuário não encontrado' })
        : response.status(200).json(medicalRecord);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar prontuário' });
    }
  }

  async deleteMedicalRecord(request: Request, response: Response): Promise<Response> {
    try {
      const success = await MedicalRecordService.deleteMedicalRecord(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: 'prontuário não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir prontuário' });
    }
  }
}

export default new MedicalRecordController();