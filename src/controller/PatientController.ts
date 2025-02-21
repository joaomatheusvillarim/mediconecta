import { Request, Response } from 'express';
import PatientService from '../service/PatientService';

class PatientController {

  async createPatient(request: Request, response: Response): Promise<Response> {
    try {
      const patient = await PatientService.createPatient(request.body);
      return response.status(201).json(patient);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar paciente' });
    }
  }

  async getPatientById(request: Request, response: Response): Promise<Response> {
    try {
      const patient = await PatientService.getPatientById(parseInt(request.params.id));
      return !patient 
        ? response.status(404).json({ error: 'Paciente não encontrado' }) 
        : response.status(200).json(patient);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar paciente' });
    }
  }

  async getAllPatients(response: Response): Promise<Response> {
    try {
      const patients = await PatientService.getAllPatients();
      return response.status(200).json(patients);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar pacientes' });
    }
  }

  async updatePatient(request: Request, response: Response): Promise<Response> {
    try {
      const patient = await PatientService.updatePatient(parseInt(request.params.id), request.body);
      return !patient
        ? response.status(404).json({ error: 'Paciente não encontrado' })
        : response.status(200).json(patient);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
  }

  async deletePatient(request: Request, response: Response): Promise<Response> {
    try {
      const success = await PatientService.deletePatient(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: 'Paciente não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir paciente' });
    }
  }
}

export default new PatientController();