import { Request, Response } from 'express';
import AppointmentService from '../service/AppointmentService';

class AppointmentController {

  async createAppointment(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const {
        patientId,
        doctorId,
        date,
        insurance
      } = request.body;

      const appointment = await AppointmentService.createAppointment(
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

      const appointment = await AppointmentService.getAppointmentById(clinicId, appointmentId);
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

      const appointments = await AppointmentService.getAllAppointments(clinicId);
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

      const appointment = await AppointmentService.updateAppointment(
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

      const success = await AppointmentService.deleteAppointment(clinicId, appointmentId);
      return !success
        ? response.status(404).json({ error: 'Consulta não encontrada' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir consulta' });
    }
  }
}

export default new AppointmentController();
