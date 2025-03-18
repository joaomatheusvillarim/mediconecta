import request from 'supertest';
import app from '../app';
import { Record } from '../src/model/Record';

describe('Record Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await Record.destroy({ where: {} });
  });

  it('should create a new record', async () => {
    const res = await request(app)
      .post('/clinics/1/patients/1/record')
      .set('Authorization', `Bearer ${token}`)
      .send({
        entries: ['Blood pressure: 120/80', 'Pulse: 70']
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all records', async () => {
    const res = await request(app)
      .get('/clinics/1/patients/1/record')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a record by ID', async () => {
    const res = await request(app)
      .get('/clinics/1/patients/1/record/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it('should update a record', async () => {
    const res = await request(app)
      .put('/clinics/1/patients/1/record/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ entries: ['Blood pressure: 130/85'] });

    expect(res.status).toBe(200);
  });

  it('should delete a record', async () => {
    const res = await request(app)
      .delete('/clinics/1/patients/1/record/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});