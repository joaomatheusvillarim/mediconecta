import { InferCreationAttributes } from "sequelize";
import { Announcement } from "../model/Announcement";

export class AnnouncementRepository {

  async createAnnouncement(data: InferCreationAttributes<Announcement>) {
      return await Announcement.create(data);
  }
  
  async getAnnouncementById(id: number) {
      return await Announcement.findByPk(id);
  }
  
  async getAllAnnouncements() {
      return await Announcement.findAll();
  }
  
  async updateAnnouncement(id: number, data: InferCreationAttributes<Announcement>) {
      const announcement = await Announcement.findByPk(id);
      return announcement
        ? await announcement!.update(data)
        : null;
  }
  
  async deleteAnnouncement(id: number) {
      let resp = false;
      const announcement = await Announcement.findByPk(id);
      if (announcement) {
          await announcement!.destroy();
          resp = true;
      }
      return resp;
  }
}
