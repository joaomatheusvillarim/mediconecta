import request from 'supertest';
import app from '../app';
import { User } from '../model/User';

describe('User Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      cpf: '12345678901',
      birthday: new Date(),
      address: 'Test Street',
      phone: '1234567890',
      sex: 'MASCULINO',
    });

    const response = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Test User 2',
        email: 'test2@example.com',
        password: '123456',
        cpf: '12345678902',
        birthday: new Date(),
        address: 'Test Street',
        phone: '1234567890',
        sex: 'MASCULINO',
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get a user profile', async () => {
    const res = await request(app)
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test@example.com');
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated User' });
    
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated User');
  });

  it('should delete user profile', async () => {
    const res = await request(app)
      .delete('/users/1')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(204);
  });
});