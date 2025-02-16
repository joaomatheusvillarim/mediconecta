import { Request, Response } from 'express';
import NoticeService from '../services/NoticeService';

class NoticeController {
  async createNotice(req: Request, res: Response): Promise<Response> {
    try {
      const notice = await NoticeService.createNotice(req.body);
      return res.status(201).json(notice);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar aviso' });
    }
  }

  async getNoticeById(req: Request, res: Response): Promise<Response> {
    try {
      const notice = await NoticeService.getNoticeById(parseInt(req.params.id));
      if (!notice) return res.status(404).json({ error: 'Aviso não encontrado' });
      return res.json(notice);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar aviso' });
    }
  }

  async updateNotice(req: Request, res: Response): Promise<Response> {
    try {
      const notice = await NoticeService.updateNotice(parseInt(req.params.id), req.body);
      if (!notice) return res.status(404).json({ error: 'Aviso não encontrado' });
      return res.json(notice);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar aviso' });
    }
  }

  async deleteNotice(req: Request, res: Response): Promise<Response> {
    try {
      const success = await NoticeService.deleteNotice(parseInt(req.params.id));
      if (!success) return res.status(404).json({ error: 'Aviso não encontrado' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir aviso' });
    }
  }
}

export default new NoticeController();
