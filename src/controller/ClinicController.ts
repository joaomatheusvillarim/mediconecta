import { Request, Response } from 'express';
import ClinicService from '../service/ClinicService';

class ClinicController {

  async createClinic(request: Request, response: Response): Promise<Response> {
    try {
      const clinic = await ClinicService.createClinic(request.body);
      return response.status(201).json(clinic);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar clínica' });
    }
  }

  async getClinicById(request: Request, response: Response): Promise<Response> {
    try {
      const clinic = await ClinicService.getClinicById(parseInt(request.params.id));
      return !clinic 
        ? response.status(404).json({ error: 'Clínica não encontrada' }) 
        : response.status(200).json(clinic);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar clínica' });
    }
  }

  async getAllClinics(response: Response): Promise<Response> {
    try {
      const clinics = await ClinicService.getAllClinics();
      return response.status(200).json(clinics);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar clínicas' });
    }
  }

  async updateClinic(request: Request, response: Response): Promise<Response> {
    try {
      const clinic = await ClinicService.updateClinic(parseInt(request.params.id), request.body);
      return !clinic
        ? response.status(404).json({ error: 'Clínica não encontrada' })
        : response.status(200).json(clinic);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar clínica' });
    }
  }

  async deleteClinic(request: Request, response: Response): Promise<Response> {
    try {
      const success = await ClinicService.deleteClinic(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: 'Clínica não encontrada' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir clínica' });
    }
  }
}

export default new ClinicController();
