import { Notice, NoticeCreationAttributes } from '../models/Notice';

class NoticeRepository {
  async findById(id: number): Promise<Notice | null> {
    return await Notice.findByPk(id);
  }

  async findAll(): Promise<Notice[]> {
    return await Notice.findAll();
  }

  async create(data: NoticeCreationAttributes): Promise<Notice> {
    return await Notice.create(data);
  }

  async update(id: number, data: Partial<Notice>): Promise<Notice | null> {
    const notice = await Notice.findByPk(id);
    if (!notice) return null;
    return await notice.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const notice = await Notice.findByPk(id);
    if (!notice) return false;
    await notice.destroy();
    return true;
  }
}

export default new NoticeRepository();
