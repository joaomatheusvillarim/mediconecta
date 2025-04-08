import { Request, Response } from 'express';
import AnnouncementService from '../service/AnnouncementService';

class AnnouncementController {

  async createAnnouncement(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const {
        authorId,
        title, 
        text 
      } = request.body;
      
      const announcement = await AnnouncementService.createAnnouncement(
        clinicId,
        authorId,
        title,
        text,
      );
      return response.status(201).json(announcement);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar aviso' });
    }
  }

  async getAnnouncementById(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const announcementdId = parseInt(request.params.announcementdId);

      const announcement = await AnnouncementService.getAnnouncementById(announcementdId, clinicId);
      return !announcement
        ? response.status(404).json({ error: 'Aviso não encontrado' }) 
        : response.status(200).json(announcement);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar aviso' });
    }
  }

  async getAllAnnouncements(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      
      const announcements = await AnnouncementService.getAllAnnouncements(clinicId);
      return response.status(200).json(announcements);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar aviso' });
    }
  }

  async updateAnnouncement(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const announcementdId = parseInt(request.params.announcementdId);

      const { title, text }  = request.body;

      const announcement = await AnnouncementService.updateAnnouncement(
        announcementdId, 
        clinicId,
        {
          title, 
          text
        }
      );
      return !announcement
        ? response.status(404).json({ error: 'Aviso não encontrado' })
        : response.status(200).json(announcement);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar aviso' });
    }
  }

  async deleteAnnouncement(request: Request, response: Response): Promise<Response> {
    try {
      const clinicId = parseInt(request.params.clinicId);
      const announcementdId = parseInt(request.params.announcementdId);

      const success = await AnnouncementService.deleteAnnouncement(announcementdId, clinicId);
      return !success
        ? response.status(404).json({ error: 'Aviso não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao remover aviso' });
    }
  }
}

export default new AnnouncementController();