import { Request, Response } from 'express';
import DoctorService from '../services/DoctorService';

class DoctorController {
  async createDoctor(req: Request, res: Response): Promise<Response> {
    try {
      const doctor = await DoctorService.createDoctor(req.body);
      return res.status(201).json(doctor);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar médico' });
    }
  }

  async getDoctorById(req: Request, res: Response): Promise<Response> {
    try {
      const doctor = await DoctorService.getDoctorById(parseInt(req.params.id));
      if (!doctor) return res.status(404).json({ error: 'Médico não encontrado' });
      return res.json(doctor);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar médico' });
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<Response> {
    try {
      const doctor = await DoctorService.updateDoctor(parseInt(req.params.id), req.body);
      if (!doctor) return res.status(404).json({ error: 'Médico não encontrado' });
      return res.json(doctor);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar médico' });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<Response> {
    try {
      const success = await DoctorService.deleteDoctor(parseInt(req.params.id));
      if (!success) return res.status(404).json({ error: 'Médico não encontrado' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir médico' });
    }
  }
}

export default new DoctorController();
