import { Request, Response } from 'express';
import SecretaryService from '../services/SecretaryService';

class SecretaryController {
  async createSecretary(req: Request, res: Response): Promise<Response> {
    try {
      const secretary = await SecretaryService.createSecretary(req.body);
      return res.status(201).json(secretary);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar secretário' });
    }
  }

  async getSecretaryById(req: Request, res: Response): Promise<Response> {
    try {
      const secretary = await SecretaryService.getSecretaryById(parseInt(req.params.id));
      if (!secretary) return res.status(404).json({ error: 'Secretário não encontrado' });
      return res.json(secretary);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar secretário' });
    }
  }

  async updateSecretary(req: Request, res: Response): Promise<Response> {
    try {
      const secretary = await SecretaryService.updateSecretary(parseInt(req.params.id), req.body);
      if (!secretary) return res.status(404).json({ error: 'Secretário não encontrado' });
      return res.json(secretary);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar secretário' });
    }
  }

  async deleteSecretary(req: Request, res: Response): Promise<Response> {
    try {
      const success = await SecretaryService.deleteSecretary(parseInt(req.params.id));
      if (!success) return res.status(404).json({ error: 'Secretário não encontrado' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir secretário' });
    }
  }

  async getAllSecretaries(req: Request, res: Response): Promise<Response> {
    try {
      const secretaries = await SecretaryService.getAllSecretaries();
      return res.json(secretaries);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar secretários' });
    }
  }
}

export default new SecretaryController();
