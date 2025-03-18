import request from 'supertest';
import app from '../app';
import { Appointment } from '../src/model/Appointment';

describe('Appointment Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await Appointment.destroy({ where: {} });
  });

  it('should create a new appointment', async () => {
    const res = await request(app)
      .post('/clinics/1/patients/1/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        doctorId: 1,
        date: '2025-04-10T10:00:00Z',
        price: 100.0,
        insurance: 'HealthPlan'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all appointments', async () => {
    const res = await request(app)
      .get('/clinics/1/patients/1/appointments')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get an appointment by ID', async () => {
    const res = await request(app)
      .get('/clinics/1/patients/1/appointments/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.doctorId).toBe(1);
  });

  it('should update an appointment', async () => {
    const res = await request(app)
      .put('/clinics/1/patients/1/appointments/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 150.0 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(150.0);
  });

  it('should delete an appointment', async () => {
    const res = await request(app)
      .delete('/clinics/1/patients/1/appointments/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});