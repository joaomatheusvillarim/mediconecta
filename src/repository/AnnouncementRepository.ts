import { Announcement } from '../model/Announcement';

export class AnnouncementRepository {

  async createAnnouncement(
    clinicId: number, 
    authorId: number, 
    title: string, 
    text: string,
  ) {
    return await Announcement.create({
      clinicId, 
      authorId, 
      title, 
      text
    });
  }

  async getAnnouncementById(
    announcementId: number,
    clinicId: number
  ) {
    return await Announcement.findOne({
      where: {
        announcementId : announcementId,
        clinicId : clinicId,
      }
    });
  }

  async getAllAnnouncements(clinicId: number) {
    return await Announcement.findAll({
      where: { 
        clinicId: clinicId,
      },
    });
  }

  async updateAnnouncement(
    announcementId: number,
    clinicId: number, 
    data: Partial<{ 
      title: string, 
      text: string,
    }>
  ) {
    const announcement = await Announcement.findOne({
      where: {
        announcementId: announcementId,
        clinicId: clinicId,
      }
    });
    return announcement
      ? await announcement!.update(data)
      : null;
  }

  async deleteAnnouncement(
    announcementId: number,
    clinicId: number
  ) {
    let resp = false;
    const announcement = await Announcement.findOne({
      where: {
        announcementId: announcementId,
        clinicId: clinicId,
      }
    });
    if (announcement) {
      await announcement!.destroy();
      resp = true;
    }
    return resp;
  }

}
