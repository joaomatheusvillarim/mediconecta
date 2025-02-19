import { Request, Response } from 'express';
import UserService from '../service/UserService';

/**
 * TODO: refatorar o código
*/

class UserController {

  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const user = await UserService.createUser(request.body);
      return response.status(201).json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async getUserById(request: Request, response: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(parseInt(request.params.id));
      if (!user) return response.status(404).json({ error: 'Usuário não encontrado' });
      return response.json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async getAllUsers(response: Response): Promise<Response> {
    try {
      const users = await UserService.getAllUsers();
      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    try {
      const user = await UserService.updateUser(parseInt(request.params.id), request.body);
      if (!user) return response.status(404).json({ error: 'Usuário não encontrado' });
      return response.json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async deleteUser(request: Request, response: Response): Promise<Response> {
    try {
      const success = await UserService.deleteUser(parseInt(request.params.id));
      if (!success) return response.status(404).json({ error: 'Usuário não encontrado' });
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  }
}

export default new UserController();