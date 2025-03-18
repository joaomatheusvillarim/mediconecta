import request from 'supertest';
import app from '../app';
import { Secretary } from '../src/model/Secretary';

describe('Secretary Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await Secretary.destroy({ where: {} });
  });

  it('should create a new secretary', async () => {
    const res = await request(app)
      .post('/clinics/1/secretaries')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 1,
        clinicId: 1,
        workingHours: '8am-6pm'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all secretaries', async () => {
    const res = await request(app)
      .get('/clinics/1/secretaries')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a secretary by ID', async () => {
    const res = await request(app)
      .get('/clinics/1/secretaries/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(1);
  });

  it('should update a secretary', async () => {
    const res = await request(app)
      .put('/clinics/1/secretaries/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ workingHours: '9am-5pm' });

    expect(res.status).toBe(200);
    expect(res.body.workingHours).toBe('9am-5pm');
  });

  it('should delete a secretary', async () => {
    const res = await request(app)
      .delete('/clinics/1/secretaries/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});