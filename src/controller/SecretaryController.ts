import { Request, Response } from 'express';
import SecretaryService from '../service/SecretaryService';

class SecretaryController {

  async createSecretary(request: Request, response: Response): Promise<Response> {
    try {
      const secretary = await SecretaryService.createSecretary(request.body);
      return response.status(201).json(secretary);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar secretário(a)' });
    }
  }

  async getSecretaryById(request: Request, response: Response): Promise<Response> {
    try {
      const secretary = await SecretaryService.getSecretaryById(parseInt(request.params.id));
      return !secretary 
        ? response.status(404).json({ error: 'Secretário(a) não encontrado' }) 
        : response.status(200).json(secretary);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar secretário(a)' });
    }
  }

  async getAllSecretaries(response: Response): Promise<Response> {
    try {
      const secretaries = await SecretaryService.getAllSecretaries();
      return response.status(200).json(secretaries);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar secretários(as)' });
    }
  }

  async updateSecretary(request: Request, response: Response): Promise<Response> {
    try {
      const secretary = await SecretaryService.updateSecretary(parseInt(request.params.id), request.body);
      return !secretary
        ? response.status(404).json({ error: 'Secretário(a) não encontrado' })
        : response.status(200).json(secretary);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar secretário(a)' });
    }
  }

  async deleteSecretary(request: Request, response: Response): Promise<Response> {
    try {
      const success = await SecretaryService.deleteSecretary(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: 'Secretário(a) não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir secretário(a)' });
    }
  }
}

export default new SecretaryController();