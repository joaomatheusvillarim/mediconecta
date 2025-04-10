import { Request, Response } from 'express';
import { DoctorService } from '../service/DoctorService';
import { injectable, inject } from "tsyringe";

@injectable()
export class DoctorController {

  constructor(@inject(DoctorService) private doctorService: DoctorService) {}

  async createDoctor(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const {
        userId,
        credentials,
        workingHours,
        specialty,
        insurance
      }  = request.body;

      const doctor = await this.doctorService.createDoctor(
        userId,
        clinicId,
        credentials,
        workingHours,
        specialty,
        insurance
      );
      return response.status(201).json(doctor);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar médico' });
    }
  }

  async getDoctorById(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const doctor = await this.doctorService.getDoctorById(userId, clinicId);
      return !doctor 
        ? response.status(404).json({ error: 'Médico não encontrado' }) 
        : response.status(200).json(doctor);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar médico' });
    }
  }

  async getAllDoctors(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);

      const doctors = await this.doctorService.getAllDoctors(clinicId);
      return response.status(200).json(doctors);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar médicos' });
    }
  }

  async updateDoctor(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const {
        credentials,
        workingHours,
        specialty,
        insurance
      }  = request.body;

      const doctor = await this.doctorService.updateDoctor(
        userId,
        clinicId,
        {
          credentials,
          workingHours,
          specialty,
          insurance
        }
      );
      return !doctor
        ? response.status(404).json({ error: 'Médico não encontrado' })
        : response.status(200).json(doctor);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar médico' });
    }
  }

  async deleteDoctor(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const userId = parseInt(request.params.userId);

      const success = await this.doctorService.deleteDoctor(userId, clinicId);
      return !success
        ? response.status(404).json({ error: 'Médico não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir médico' });
    }
  }
}
