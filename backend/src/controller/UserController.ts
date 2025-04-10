import { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import { injectable, inject } from "tsyringe";

@injectable()
export class UserController {

  constructor(@inject(UserService) private userService: UserService) {}

  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name, 
        email, 
        password, 
        cpf, 
        birthday, 
        sex, 
        address, 
        phone
      } = request.body;
      const user = await this.userService.createUser(
        name, 
        email, 
        password, 
        cpf, 
        birthday, 
        sex, 
        address, 
        phone
      );
      return response.status(201).json(user);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async getUserById(request: Request, response: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(parseInt(request.params.id));
      return !user 
        ? response.status(404).json({ error: 'Usuário não encontrado' }) 
        : response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async getAllUsers(response: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name, 
        email, 
        password, 
        cpf, 
        birthday, 
        sex, 
        address, 
        phone
      } = request.body;
      const user = await this.userService.updateUser(parseInt(request.params.id), {
        name, 
        email, 
        password, 
        cpf, 
        birthday, 
        sex, 
        address, 
        phone
      });
      return !user
        ? response.status(404).json({ error: 'Usuário não encontrado' })
        : response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async deleteUser(request: Request, response: Response): Promise<Response> {
    try {
      const success = await this.userService.deleteUser(parseInt(request.params.id));
      return !success
        ? response.status(404).json({ error: 'Usuário não encontrado' })
        : response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  }
}
