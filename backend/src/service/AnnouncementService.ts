import { Announcement } from '../model/Announcement';
import { AnnouncementRepository } from '../repository/AnnouncementRepository';
import Validations from '../util/Validations';

export class AnnouncementService {

  private announcementRepository: AnnouncementRepository;

  constructor(announcementRepository?: AnnouncementRepository) {
    this.announcementRepository = announcementRepository || new AnnouncementRepository();
  }

  async createAnnouncement(
    clinicId: number, 
    authorId: number, 
    title: string, 
    text: string
  ) {

    Validations.validateAnnouncementTitle(title);
    Validations.validateAnnouncementText(text);

    return await this.announcementRepository.createAnnouncement(
      clinicId,
      authorId,
      title,
      text
    );

  }

  async getAnnouncementById(
    announcementdId: number,
    clinicId: number
  ): Promise<Announcement | null> {    
    return await this.announcementRepository.getAnnouncementById(announcementdId, clinicId);
  }

  async getAllAnnouncements(clinicId: number): Promise<Announcement[]> {
    return await this.announcementRepository.getAllAnnouncements(clinicId); 
  }

  async updateAnnouncement(
    announcementdId: number,
    clinicId: number, 
    data: Partial<{
      title: string,
      text: string
    }>
    
  ): Promise<Announcement | null> {
    if (data.title) Validations.validateAnnouncementTitle(data.title);
    if (data.text) Validations.validateAnnouncementTitle(data.text);

    return await this.announcementRepository.updateAnnouncement(announcementdId, clinicId, data);
  }

  async deleteAnnouncement(
    announcementdId: number,
    clinicId: number
  ): Promise<boolean> {
    return await this.announcementRepository.deleteAnnouncement(announcementdId, clinicId);
  }
}
