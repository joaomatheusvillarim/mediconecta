import { Request, Response } from 'express';
import { SecretaryService } from '../service/SecretaryService';
import { injectable, inject } from "tsyringe";

@injectable()
export class SecretaryController {

  constructor(@inject(SecretaryService) private secretaryService: SecretaryService) {}

  async createSecretary(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const { userId, workingHours } = request.body;

      const secretary = await this.secretaryService.createSecretary(
        userId, 
        clinicId, 
        workingHours
      );
      return response.status(201).json(secretary);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar secretário' });
    }
  }

  async getSecretaryById(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const secretary = await this.secretaryService.getSecretaryById(userId, clinicId);
      return !secretary
        ? response.status(404).json({ error: 'Secretário não encontrado' }) 
        : response.status(200).json(secretary);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar secretário' });
    }
  }

  async getAllSecretaries(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      
      const secretaries = await this.secretaryService.getAllSecretaries(clinicId);
      return response.status(200).json(secretaries);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar secretários' });
    }
  }

  async updateSecretary(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);
      
      const { workingHours } = request.body;

      const secretary = await this.secretaryService.updateSecretary(
        userId, 
        clinicId, 
        { workingHours }
      );
      return !secretary
        ? response.status(404).json({ error: 'Secretátio não encontrado' })
        : response.status(200).json(secretary);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar secretário' });
    }
  }

  async deleteSecretary(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const sucess = await this.secretaryService.deleteSecretary(userId, clinicId);
      return !sucess
        ? response.status(404).json({ error: 'Secretário não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao remover secretário' });
    }
  }
}
