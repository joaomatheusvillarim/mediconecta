import { Request, Response } from 'express';
import DoctorService from '../service/DoctorService';

class DoctorController {

  async createDoctor(request: Request, response: Response): Promise<Response> {
    try {
      const doctor = await DoctorService.createDoctor(request.body);
      return response.status(201).json(doctor);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar médico' });
    }
  }

  async getDoctorById(request: Request, response: Response): Promise<Response> {
    try {
      const doctor = await DoctorService.getDoctorById(parseInt(request.params.id));
      return !doctor 
        ? response.status(404).json({ error: 'Médico não encontrado' }) 
        : response.status(200).json(doctor);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar médico' });
    }
  }

  async getAllDoctors(response: Response): Promise<Response> {
    try {
      const doctors = await DoctorService.getAllDoctors();
      return response.status(200).json(doctors);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar médicos' });
    }
  }

  async updateDoctor(request: Request, response: Response): Promise<Response> {
    try {
      const doctor = await DoctorService.updateDoctor(parseInt(request.params.id), request.body);
      return !doctor
        ? response.status(404).json({ error: 'Médico não encontrado' })
        : response.status(200).json(doctor);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar médico' });
    }
  }

  async deleteDoctor(request: Request, response: Response): Promise<Response> {
    try {
      const success = await DoctorService.deleteDoctor(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: 'Médico não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir médico' });
    }
  }
}

export default new DoctorController();