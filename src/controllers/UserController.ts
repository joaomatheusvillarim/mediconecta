import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(parseInt(req.params.id));
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.updateUser(parseInt(req.params.id), req.body);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const success = await UserService.deleteUser(parseInt(req.params.id));
      if (!success) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  }
}

export default new UserController();
