import request from 'supertest';
import express from 'express';
import ClinicRoutes from '../../src/routes/ClinicRoutes';
import ClinicService from '../../src/service/ClinicService';

jest.mock('../../src/service/ClinicService', () => ({
  createClinic: jest.fn(),
  getClinicById: jest.fn(),
  getAllClinics: jest.fn(),
  updateClinic: jest.fn(),
  deleteClinic: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(ClinicRoutes);

describe('ClinicRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /clinics/ deve criar um novo consultório', async () => {
    const mockClinic = {
      adminId: "1",
      name: "Clínica Top Exames",
      address: "Rua Aprígio Veloso, 1000",
      workingHours: "seg-sex 8-12h 14-18h",
      specialties: "endocrinologia e otorrrinolaringologia",
      phone: "83987654321",
      email: "clinicatopexames@gmail.com",
    };
    (ClinicService.createClinic as jest.Mock).mockResolvedValue(mockClinic);

    const response = await request(app)
      .post('/Clinics/')
      .send({
        adminId: "1",
        name: "Clínica Top Exames",
        address: "Rua Aprígio Veloso, 1000",
        workingHours: "seg-sex 8-12h 14-18h",
        specialties: "endocrinologia e otorrrinolaringologia",
        phone: "83987654321",
        email: "clinicatopexames@gmail.com",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockClinic);
    expect(ClinicService.createClinic).toHaveBeenCalledWith(
      "1",
      "Clínica Top Exames",
      "Rua Aprígio Veloso, 1000",
      "seg-sex 8-12h 14-18h",
      "endocrinologia e otorrrinolaringologia",
      "83987654321",
      "clinicatopexames@gmail.com",
    );
  });

  test('GET /clinics/:id deve retornar um consultório, caso encontrado', async () => {
    const mockClinic = {
      adminId: "1",
      name: "Clínica Top Exames",
      address: "Rua Aprígio Veloso, 1000",
      workingHours: "seg-sex 8-12h 14-18h",
      specialties: "endocrinologia e otorrrinolaringologia",
      phone: "83987654321",
      email: "clinicatopexames@gmail.com",
    };
    (ClinicService.getClinicById as jest.Mock).mockResolvedValue(mockClinic);
    const response = await request(app).get('/clinics/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockClinic);
    expect(ClinicService.getClinicById).toHaveBeenCalledWith(1);
  });

  test('GET /clinics/:id deve retornar código 404 caso não encontre consultório', async () => {
    (ClinicService.getClinicById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/clinics/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Consultório não encontrado' });
  });

  test('GET /clinics/ deve retornar todos os consultórios', async () => {
    const mockClinics = [
      {
        adminId: "1",
        name: "Clínica Top Exames",
        address: "Rua Aprígio Veloso, 1000",
        workingHours: "seg-sex 8-12h 14-18h",
        specialties: "endocrinologia e otorrrinolaringologia",
        phone: "83987654321",
        email: "clinicatopexames@gmail.com",
      }
    ];
    (ClinicService.getAllClinics as jest.Mock).mockResolvedValue(mockClinics);

    const response = await request(app).get('/clinics/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockClinics);
    expect(ClinicService.getAllClinics).toHaveBeenCalled();
  });

  test('PUT /clinics/:id deve atualizar um consultório', async () => {
    const mockClinic = {
      adminId: "1",
      name: "Clínica Top Exames",
      address: "Rua Aprígio Veloso, 1000",
      workingHours: "seg-sex 8-12h 14-18h",
      specialties: "endocrinologia e otorrrinolaringologia",
      phone: "83987654321",
      email: "clinicatopexames@gmail.com",
    };
    (ClinicService.updateClinic as jest.Mock).mockResolvedValue(mockClinic);
    const response = await request(app).put('/clinics/1').send({ workingHours: 'seg-sex 9-12h 14-18h' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockClinic);
    expect(ClinicService.updateClinic).toHaveBeenCalledWith(1, { workingHours: 'seg-sex 9-12h 14-18h' });
  });

  test('DELETE /clinics/:id deve retornar código 204 caso tenha sucesso', async () => {
    (ClinicService.deleteClinic as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete('/clinics/1');

    expect(response.status).toBe(204);
    expect(ClinicService.deleteClinic).toHaveBeenCalledWith(1);
  });

  test('DELETE /clinics/:id deve retornar código 404 caso o consultório não seja encontrado', async () => {
    (ClinicService.deleteClinic as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete('/clinics/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Consultório não encontrado' });
  });
});
