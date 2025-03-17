import { Announcement } from '../model/Announcement';
import { AnnouncementRepository } from '../repository/AnnouncementRepository';
import Validations from '../util/Validations';

const announcementRepository = new AnnouncementRepository();

class AnnouncementService {

  async createAnnouncement(
    clinicId: number, 
    authorId: number, 
    title: string, 
    text: string) {

    Validations.validateClinicId(clinicId);
    Validations.validateUserId(authorId);
    return await announcementRepository.createAnnouncement(
      clinicId,
      authorId,
      title,
      text,
    );

  }

  async getAnnouncementById(
    announcementdId: number,
    clinicId: number
  ): Promise<Announcement | null> {
    
    Validations.validateUserId(announcementdId);
    Validations.validateClinicId(clinicId);
    
    return await announcementRepository.getAnnouncementById(announcementdId, clinicId);
  }

  async getAllAnnouncements(clinicId: number): Promise<Announcement[]> {

    Validations.validateClinicId(clinicId);

    return await announcementRepository.getAllAnnouncements(clinicId); 
  }

  async updateAnnouncement(
    announcementdId: number,
    clinicId: number, 
    data: Partial<{
      title: string,
      text: string
    }>
    
  ): Promise<Announcement | null> {
   
    Validations.validateUserId(announcementdId);
    Validations.validateClinicId(clinicId);

    if (data.title) Validations.validateOrdinaryText(data.title);
    if (data.text)  Validations.validateOrdinaryText(data.text);

    
    
    return await announcementRepository.updateAnnouncement(announcementdId, clinicId, data);
  }

  async deleteAnnouncement(
    announcementdId: number,
    clinicId: number
  ): Promise<boolean> {

    Validations.validateUserId(announcementdId);
    Validations.validateClinicId(clinicId);

    return await announcementRepository.deleteAnnouncement(announcementdId, clinicId);
  }
}

export default new AnnouncementService();
