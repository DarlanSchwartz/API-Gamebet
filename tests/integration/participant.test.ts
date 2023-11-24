import supertest from 'supertest';
import { Participant } from '@prisma/client';
import { createParticipant } from '../factories/participant.factory';
import { clearDatabase } from '../helpers';
import prisma from '@/config/database';
import app from '@/app';

const server = supertest(app);
beforeEach(async () => {
  await clearDatabase();
});

describe('GET /participants', () => {
  it('Should return all participants created', async () => {
    await createParticipant();
    const res = await server.get('/participants');
    expect(res.body).toEqual([
      {
        id: expect.any(Number),
        balance: expect.any(Number),
        createdAt: expect.any(String),
        name: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });
});

describe('/POST participant', () => {
  it('shold return 422 when body is empity or incorrect', async () => {
    const res = await server.post('/participants');
    expect(res.status).toBe(422);
  });

  it('Should return 409 when balance is lower than 10R$ = 1000', async () => {
    const participant = {
      name: 'Darlan Schwartz',
      balance: 100,
    };
    const res = await server.post('/participants').send(participant);
    expect(res.status).toBe(422);
  });

  it('Should return an participant if the body is correct', async () => {
    const participant = {
      name: 'Darlan Schwartz',
      balance: 10000,
    };
    const res = await server.post('/participants').send(participant);
    expect(res.body).toMatchObject<Participant>({
      id: expect.any(Number),
      balance: expect.any(Number),
      createdAt: expect.any(String),
      name: expect.any(String),
      updatedAt: expect.any(String),
    });
    const foundParticipant = await prisma.participant.findFirst({
      where: { id: res.body.id },
    });
    expect(foundParticipant).toMatchObject({ id: res.body.id, });
  });
});
