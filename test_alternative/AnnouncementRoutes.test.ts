import request from 'supertest';
import app from '../app';
import { Announcement } from '../src/model/Announcement';

describe('Announcement Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await Announcement.destroy({ where: {} });
  });

  it('should create a new announcement', async () => {
    const res = await request(app)
      .post('/clinics/1/announcements')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Announcement',
        text: 'This is an announcement',
        authorId: 1,
        date: new Date()
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all announcements', async () => {
    const res = await request(app)
      .get('/clinics/1/announcements')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get an announcement by ID', async () => {
    const res = await request(app)
      .get('/clinics/1/announcements/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it('should update an announcement', async () => {
    const res = await request(app)
      .put('/clinics/1/announcements/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Announcement' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Announcement');
  });

  it('should delete an announcement', async () => {
    const res = await request(app)
      .delete('/clinics/1/announcements/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});