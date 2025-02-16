import { Request, Response } from 'express';
import PatientService from '../services/PatientService';

class PatientController {
  async createPatient(req: Request, res: Response): Promise<Response> {
    try {
      const patient = await PatientService.createPatient(req.body);
      return res.status(201).json(patient);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar paciente' });
    }
  }

  async getPatientById(req: Request, res: Response): Promise<Response> {
    try {
      const patient = await PatientService.getPatientById(parseInt(req.params.id));
      if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });
      return res.json(patient);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar paciente' });
    }
  }

  async updatePatient(req: Request, res: Response): Promise<Response> {
    try {
      const patient = await PatientService.updatePatient(parseInt(req.params.id), req.body);
      if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });
      return res.json(patient);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
  }

  async deletePatient(req: Request, res: Response): Promise<Response> {
    try {
      const success = await PatientService.deletePatient(parseInt(req.params.id));
      if (!success) return res.status(404).json({ error: 'Paciente não encontrado' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir paciente' });
    }
  }
}

export default new PatientController();
