import request from 'supertest';
import app from '../app';
import { Patient } from '../src/model/Patient';

describe('Patient Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await Patient.destroy({ where: {} });
  });

  it('should create a new patient', async () => {
    const res = await request(app)
      .post('/clinics/1/patients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 1,
        clinicId: 1,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all patients from a clinic', async () => {
    const res = await request(app)
      .get('/clinics/1/patients')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a patient by ID', async () => {
    const res = await request(app)
      .get('/clinics/1/patients/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(1);
  });

  it('should update a patient', async () => {
    const res = await request(app)
      .put('/clinics/1/patients/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: 2 });

    expect(res.status).toBe(200);
  });

  it('should delete a patient', async () => {
    const res = await request(app)
      .delete('/clinics/1/patients/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});