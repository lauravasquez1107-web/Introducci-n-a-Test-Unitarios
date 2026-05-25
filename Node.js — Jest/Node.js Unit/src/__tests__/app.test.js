const request = require('supertest');
const app = require('../app');

describe('Users API', () => {

  describe('GET /api/users', () => {
    it('devuelve lista de usuarios con status 200', async () => {
      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('devuelve el usuario correcto', async () => {
      const res = await request(app).get('/api/users/1');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ id: 1, name: 'Ana' });
    });

    it('devuelve 404 si el usuario no existe', async () => {
      const res = await request(app).get('/api/users/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users', () => {
    it('crea un usuario y devuelve 201', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Elena', email: 'elena@ejemplo.com' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ name: 'Elena', email: 'elena@ejemplo.com' });
      expect(res.body.id).toBeDefined();
    });

    it('devuelve 400 si faltan campos requeridos', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'SinEmail' });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/email/i);
    });
  });

});