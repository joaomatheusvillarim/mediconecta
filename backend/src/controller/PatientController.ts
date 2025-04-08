import { Request, Response } from 'express';
import PatientService from '../service/PatientService';

class PatientController {

  async createPatient(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const { userId }  = request.body;
      const patient = await PatientService.createPatient(userId, clinicId);

      return response.status(201).json(patient);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao criar paciente" });
    }
  }

  async getPatientById(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const patient = await PatientService.getPatientById(userId, clinicId);
      return !patient 
        ? response.status(404).json({ error: "Paciente não encontrado" }) 
        : response.status(200).json(patient);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar paciente" });
    }
  }

  async getAllPatients(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);

      const patients = await PatientService.getAllPatients(clinicId);
      return response.status(200).json(patients);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao listar pacientes" });
    }
  }

  async updatePatient(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const patient = await PatientService.updatePatient(userId, clinicId);
      return !patient
        ? response.status(404).json({ error: "Paciente não encontrado" })
        : response.status(200).json(patient);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar paciente" });
    }
  }

  async deletePatient(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const success = await PatientService.deletePatient(userId, clinicId);
      return !success
        ? response.status(404).json({ error: "Paciente não encontrado" })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: "Erro ao excluir paciente" });
    }
  }
}

export default new PatientController();