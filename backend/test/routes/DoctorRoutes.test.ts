import request from 'supertest';
import express from 'express';
import DoctorRoutes from '../../src/routes/DoctorRoutes';
import DoctorService from '../../src/service/DoctorService';

jest.mock('../../src/service/DoctorService', () => ({
  createDoctor: jest.fn(),
  getDoctorById: jest.fn(),
  getAllDoctors: jest.fn(),
  updateDoctor: jest.fn(),
  deleteDoctor: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(DoctorRoutes);

describe('DoctorRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /clinics/:clinicId/doctors deve criar um novo médico em consultório', async () => {
    const mockDoctor = {
      userId: "1",
      credentials: "1234PB",
      workingHours: "seg-sex 14-20h",
      specialty: "endocrinologia",
      insurance: "unimed",
    };
    (DoctorService.createDoctor as jest.Mock).mockResolvedValue(mockDoctor);

    const response = await request(app)
      .post('/clinics/1/doctors')
      .send({
        userId: "1",
        credentials: "1234PB",
        workingHours: "seg-sex 14-20h",
        specialty: "endocrinologia",
        insurance: "unimed",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockDoctor);
    expect(DoctorService.createDoctor).toHaveBeenCalledWith(
      "1",
      "1234PB",
      "seg-sex 14-20h",
      "endocrinologia",
      "unimed",
    );
  });

  test('GET /clinics/:clinicId/doctors/:userId deve retornar um médico, caso encontrado', async () => {
    const mockDoctor = {
      userId: "1",
      credentials: "1234PB",
      workingHours: "seg-sex 14-20h",
      specialty: "endocrinologia",
      insurance: "unimed",
    };
    (DoctorService.getDoctorById as jest.Mock).mockResolvedValue(mockDoctor);
    const response = await request(app).get('/clinics/1/doctors/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDoctor);
    expect(DoctorService.getDoctorById).toHaveBeenCalledWith(1);
  });

  test('GET /clinics/:clinicId/doctors/:userId deve retornar código 404 caso não encontre médico', async () => {
    (DoctorService.getDoctorById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/clinics/1/doctors/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'médico não encontrado' });
  });

  test('GET /clinics/:clinicId/doctors/ deve retornar todos os médicos', async () => {
    const mockDoctors = [
      {
        userId: "1",
        credentials: "1234PB",
        workingHours: "seg-sex 14-20h",
        specialty: "endocrinologia",
        insurance: "unimed",
      }
    ];
    (DoctorService.getAllDoctors as jest.Mock).mockResolvedValue(mockDoctors);

    const response = await request(app).get('/clinics/1/doctors/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDoctors);
    expect(DoctorService.getAllDoctors).toHaveBeenCalled();
  });

  test('PUT /clinics/:clinicId/doctors/:userId deve atualizar um médico', async () => {
    const mockDoctor = {
      userId: "1",
      credentials: "1234PB",
      workingHours: "seg-sex 14-20h",
      specialty: "endocrinologia",
      insurance: "unimed",
    };
    (DoctorService.updateDoctor as jest.Mock).mockResolvedValue(mockDoctor);
    const response = await request(app).put('/clinics/1/doctors/1').send({ insurance: "unimed e hapvida" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDoctor);
    expect(DoctorService.updateDoctor).toHaveBeenCalledWith(1, { insurance: "unimed e hapvida" });
  });

  test('DELETE /clinics/:clinicId/doctors/:userId deve retornar código 204 caso tenha sucesso', async () => {
    (DoctorService.deleteDoctor as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete('/clinics/1/doctors/1');

    expect(response.status).toBe(204);
    expect(DoctorService.deleteDoctor).toHaveBeenCalledWith(1);
  });

  test('DELETE /clinics/:clinicId/doctors/:userId deve retornar código 404 caso o médico não seja encontrado', async () => {
    (DoctorService.deleteDoctor as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete('/clinics/1/doctors/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'médico não encontrado' });
  });
});
