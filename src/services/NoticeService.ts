import { Notice } from '../models/Notice';

class NoticeService {
  async createNotice(data: Partial<Notice>): Promise<Notice> {
    return await Notice.create(data);
  }

  async getNoticeById(id: number): Promise<Notice | null> {
    return await Notice.findByPk(id);
  }

  async updateNotice(id: number, data: Partial<Notice>): Promise<Notice | null> {
    const notice = await Notice.findByPk(id);
    if (!notice) return null;
    return await notice.update(data);
  }

  async deleteNotice(id: number): Promise<boolean> {
    const notice = await Notice.findByPk(id);
    if (!notice) return false;
    await notice.destroy();
    return true;
  }
}

export default new NoticeService();
