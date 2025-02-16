import { Request, Response } from 'express';
import MedicalRecordService from '../services/MedicalRecordService';

class MedicalRecordController {
  async createMedicalRecord(req: Request, res: Response): Promise<Response> {
    try {
      const record = await MedicalRecordService.createMedicalRecord(req.body);
      return res.status(201).json(record);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar prontuário' });
    }
  }

  async getMedicalRecordById(req: Request, res: Response): Promise<Response> {
    try {
      const record = await MedicalRecordService.getMedicalRecordById(parseInt(req.params.id));
      if (!record) return res.status(404).json({ error: 'Prontuário não encontrado' });
      return res.json(record);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar prontuário' });
    }
  }

  async updateMedicalRecord(req: Request, res: Response): Promise<Response> {
    try {
      const record = await MedicalRecordService.updateMedicalRecord(parseInt(req.params.id), req.body);
      if (!record) return res.status(404).json({ error: 'Prontuário não encontrado' });
      return res.json(record);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar prontuário' });
    }
  }

  async deleteMedicalRecord(req: Request, res: Response): Promise<Response> {
    try {
      const success = await MedicalRecordService.deleteMedicalRecord(parseInt(req.params.id));
      if (!success) return res.status(404).json({ error: 'Prontuário não encontrado' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir prontuário' });
    }
  }
}

export default new MedicalRecordController();
