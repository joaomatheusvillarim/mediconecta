import request from 'supertest';
import express from 'express';
import UserRoutes from '../../src/routes/UserRoutes';
import UserService from '../../src/service/UserService';

jest.mock('../../src/service/UserService', () => ({
  createUser: jest.fn(),
  getUserById: jest.fn(),
  getAllUsers: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(UserRoutes);

describe('UserRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /users/ deve criar um novo usuário', async () => {
    const mockUser = {
      name: "Joao Matheus",
      email: "joaomatheus@gmail.com",
      password: "12345678Jm!",
      cpf: "12345678900",
      birthday: "01/01/2000",
      sex: "MASCULINO",
      address: "Rua Aprígio Veloso, 880",
      phone: "83987654321"
    };
    (UserService.createUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/users/')
      .send({
        name: "Joao Matheus",
        email: "joaomatheus@gmail.com",
        password: "12345678Jm!",
        cpf: "12345678900",
        birthday: "01/01/2000",
        sex: "MASCULINO",
        address: "Rua Aprígio Veloso, 880",
        phone: "83987654321"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(UserService.createUser).toHaveBeenCalledWith(
      "Joao Matheus",
      "joaomatheus@gmail.com",
      "12345678Jm!",
      "12345678900",
      "01/01/2000",
      "MASCULINO",
      "Rua Aprígio Veloso, 880",
      "83987654321"
    );
  });

  test('GET /users/:id deve retornar um usuário, caso encontrado', async () => {
    const mockUser = {
      id: 1,
      name: "Joao Matheus",
      email: "joaomatheus@gmail.com",
      password: "12345678Jm!",
      cpf: "12345678900",
      birthday: "01/01/2000",
      sex: "MASCULINO",
      address: "Rua Aprígio Veloso, 880",
      phone: "83987654321"
    };
    (UserService.getUserById as jest.Mock).mockResolvedValue(mockUser);
    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(UserService.getUserById).toHaveBeenCalledWith(1);
  });

  test('GET /users/:id deve retornar código 404 caso não encontre usuário', async () => {
    (UserService.getUserById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/users/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Usuário não encontrado' });
  });

  test('GET /users/ deve retornar todos os usuários', async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Joao Matheus",
        email: "joaomatheus@gmail.com",
        password: "12345678Jm!",
        cpf: "12345678900",
        birthday: "01/01/2000",
        sex: "MASCULINO",
        address: "Rua Aprígio Veloso, 880",
        phone: "83987654321"
      }
    ];
    (UserService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get('/users/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(UserService.getAllUsers).toHaveBeenCalled();
  });

  test('PUT /users/:id deve atualizar um usuário', async () => {
    const mockUser = {
      id: 1,
      name: "Joao Matheus Villarim",
      email: "joaomatheus@gmail.com",
      password: "12345678Jm!",
      cpf: "12345678900",
      birthday: "01/01/2000",
      sex: "MASCULINO",
      address: "Rua Aprígio Veloso, 880",
      phone: "83987654321"
    };    (UserService.updateUser as jest.Mock).mockResolvedValue(mockUser);
    const response = await request(app).put('/users/1').send({ name: 'Joao Matheus Villarim' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(UserService.updateUser).toHaveBeenCalledWith(1, { name: 'Joao Matheus Villarim' });
  });

  test('DELETE /users/:id deve retornar código 204 caso tenha sucesso', async () => {
    (UserService.deleteUser as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete('/users/1');

    expect(response.status).toBe(204);
    expect(UserService.deleteUser).toHaveBeenCalledWith(1);
  });

  test('DELETE /users/:id deve retornar código 404 caso o usuário não seja encontrado', async () => {
    (UserService.deleteUser as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete('/users/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Usuário não encontrado' });
  });
});
