import { Request, Response } from 'express';
import { AppointmentService } from '../service/AppointmentService';
import { injectable, inject } from "tsyringe";

@injectable()
export class AppointmentController {

  constructor(@inject(AppointmentService) private appointmentService: AppointmentService) {}

  async createAppointment(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const {
        patientId,
        doctorId,
        date,
        insurance
      } = request.body;

      const appointment = await this.appointmentService.createAppointment(
        clinicId,
        patientId,
        doctorId,
        date,
        insurance
      );
      return response.status(201).json(appointment);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao criar consulta" });
    }
  }

  async getAppointmentById(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const appointmentId = parseInt(request.params.appointmentId);

      const appointment = await this.appointmentService.getAppointmentById(clinicId, appointmentId);
      return !appointment 
        ? response.status(404).json({ error: 'Consulta não encontrada' }) 
        : response.status(200).json(appointment);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar consulta' });
    }
  }

  async getAllAppointments(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);

      const appointments = await this.appointmentService.getAllAppointments(clinicId);
      return response.status(200).json(appointments);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar consultas' });
    }
  }

  async updateAppointment(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const appointmentId = parseInt(request.params.appointmentId);
      const {
        patientId,
        doctorId,
        date,
        insurance,
        status
      } = request.body;

      const appointment = await this.appointmentService.updateAppointment(
        clinicId,
        appointmentId,
        {
          patientId,
          doctorId,
          date,
          insurance,
          status
        }
      );
      return !appointment
        ? response.status(404).json({ error: 'Consulta não encontrada' })
        : response.status(200).json(appointment);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar consulta' });
    }
  }

  async deleteAppointment(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const appointmentId = parseInt(request.params.appointmentId);

      const success = await this.appointmentService.deleteAppointment(clinicId, appointmentId);
      return !success
        ? response.status(404).json({ error: 'Consulta não encontrada' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir consulta' });
    }
  }
}
