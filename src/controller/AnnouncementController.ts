import { Request, Response } from 'express';
import AnnouncementService from '../service/AnnouncementService';

class AnnouncementController {

  async createAnnouncement(request: Request, response: Response): Promise<Response> {
    try {
      const announcement = await AnnouncementService.createAnnouncement(request.body);
      return response.status(201).json(announcement);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar aviso' });
    }
  }

  async getAnnouncementById(request: Request, response: Response): Promise<Response> {
    try {
      const announcement = await AnnouncementService.getAnnouncementById(parseInt(request.params.id));
      return !announcement 
        ? response.status(404).json({ error: 'Aviso não encontrado' }) 
        : response.status(200).json(announcement);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar aviso' });
    }
  }

  async getAllAnnouncements(response: Response): Promise<Response> {
    try {
      const announcements = await AnnouncementService.getAllAnnouncements();
      return response.status(200).json(announcements);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar avisos' });
    }
  }

  async updateAnnouncement(request: Request, response: Response): Promise<Response> {
    try {
      const announcement = await AnnouncementService.updateAnnouncement(parseInt(request.params.id), request.body);
      return !announcement
        ? response.status(404).json({ error: 'Aviso não encontrado' })
        : response.status(200).json(announcement);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar aviso' });
    }
  }

  async deleteAnnouncement(request: Request, response: Response): Promise<Response> {
    try {
      const success = await AnnouncementService.deleteAnnouncement(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: 'Aviso não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir aviso' });
    }
  }
}

export default new AnnouncementController();
