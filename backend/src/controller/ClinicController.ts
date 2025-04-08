import { Request, Response } from 'express';
import ClinicService from '../service/ClinicService';

class ClinicController {

  async createClinic(request: Request, response: Response): Promise<Response> {
    try {
      const {
        adminId,
        name,
        address,
        workingHours,
        specialties,
        phone,
        email
      } = request.body;
      const clinic = await ClinicService.createClinic(
        adminId,
        name,
        address,
        workingHours,
        specialties,
        phone,
        email
      );
      return response.status(201).json(clinic);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao criar consultório" });
    }
  }

  async getClinicById(request: Request, response: Response): Promise<Response> {
    try {
      const clinic = await ClinicService.getClinicById(parseInt(request.params.id));
      return !clinic 
        ? response.status(404).json({ error: "Consultório não encontrado" }) 
        : response.status(200).json(clinic);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar consultório" });
    }
  }

  async getAllClinics(response: Response): Promise<Response> {
    try {
      const clinics = await ClinicService.getAllClinics();
      return response.status(200).json(clinics);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao listar consultórios" });
    }
  }

  async updateClinic(request: Request, response: Response): Promise<Response> {
    try {
      const {
        adminId,
        name,
        address,
        workingHours,
        specialties,
        phone,
        email
      } = request.body;
      const clinic = await ClinicService.updateClinic(
        parseInt(request.params.id), {
        adminId,
        name,
        address,
        workingHours,
        specialties,
        phone,
        email
      });
      return !clinic
        ? response.status(404).json({ error: "Consultório não encontrado" })
        : response.status(200).json(clinic);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar consultório" });
    }
  }

  async deleteClinic(request: Request, response: Response): Promise<Response> {
    try {
      const success = await ClinicService.deleteClinic(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: "Consultório não encontrado" })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: "Erro ao excluir consultório" });
    }
  }
}

export default new ClinicController();
