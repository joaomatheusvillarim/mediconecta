import { Request, Response } from 'express';
import AppointmentService from '../service/AppointmentService';

class AppointmentController {

  async createAppointment(request: Request, response: Response): Promise<Response> {
    try {
      const appointment = await AppointmentService.createAppointment(request.body);
      return response.status(201).json(appointment);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar consulta' });
    }
  }

  async getAppointmentById(request: Request, response: Response): Promise<Response> {
    try {
      const appointment = await AppointmentService.getAppointmentById(parseInt(request.params.id));
      return !appointment 
        ? response.status(404).json({ error: 'Consulta não encontrada' }) 
        : response.status(200).json(appointment);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar consulta' });
    }
  }

  async getAllAppointments(response: Response): Promise<Response> {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      return response.status(200).json(appointments);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar consultas' });
    }
  }

  async updateAppointment(request: Request, response: Response): Promise<Response> {
    try {
      const appointment = await AppointmentService.updateAppointment(parseInt(request.params.id), request.body);
      return !appointment
        ? response.status(404).json({ error: 'Consulta não encontrada' })
        : response.status(200).json(appointment);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar consulta' });
    }
  }

  async deleteAppointment(request: Request, response: Response): Promise<Response> {
    try {
      const success = await AppointmentService.deleteAppointment(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: 'Consulta não encontrada' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir consulta' });
    }
  }
}

export default new AppointmentController();
