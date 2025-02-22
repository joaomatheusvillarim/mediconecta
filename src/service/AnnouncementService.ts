import { InferCreationAttributes } from 'sequelize';
import { Announcement } from '../model/Announcement';
import { AnnouncementRepository } from '../repository/AnnouncementRepository';

const announcementRepository = new AnnouncementRepository();

class AnnouncementService {

  async createAnnouncement(data: InferCreationAttributes<Announcement>): Promise<Announcement> {
    return await announcementRepository.createAnnouncement(data);
  }

  async getAnnouncementById(id: number): Promise<Announcement | null> {
    return await announcementRepository.getAnnouncementById(id);
  }

  async getAllAnnouncements(): Promise<Announcement[]> {
    return await announcementRepository.getAllAnnouncements();
  }

  async updateAnnouncement(id: number, data: InferCreationAttributes<Announcement>): Promise<Announcement | null> {
    return await announcementRepository.updateAnnouncement(id, data);
  }

  async deleteAnnouncement(id: number): Promise<boolean> {
    return await announcementRepository.deleteAnnouncement(id);
  }
  
}

export default new AnnouncementService();
