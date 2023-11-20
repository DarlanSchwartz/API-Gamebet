import supertest from 'supertest';
import { Bet } from '@prisma/client';
import httpStatus from 'http-status';
import { createGame } from '../factories/game.factory';
import { createParticipant } from '../factories/participant.factory';
import { clearDatabase } from '../helpers';
import app from '@/app';
import prisma from '@/config/database';

const server = supertest(app);

beforeEach(async () => {
  await clearDatabase();
});

describe('POST /bets', () => {
  it('Shold return 422 when body is empity or incorrect', async () => {
    const res = await server.post('/bets');
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('Should respond status 422 if gameId is negative or 0', async () => {
    const participant = await createParticipant();
    const newBet = {
      homeTeamScore: 6,
      awayTeamScore: 5,
      amountBet: 100,
      gameId: 0,
      participantId: participant.id,
    };
    const res = await server.post('/bets').send(newBet);
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('Should respond status 422 if the bet is negative', async () => {
    const game = await createGame(false);
    const participant = await createParticipant();

    const newBet = {
      homeTeamScore: 6,
      awayTeamScore: 8,
      amountBet: -100,
      gameId: game.id,
      participantId: participant.id,
    };

    const res = await server.post('/bets').send(newBet);
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('Should respond status 422 if the bet game scores is negative', async () => {
    const game = await createGame(false);
    const participant = await createParticipant();

    const newBet = {
      homeTeamScore: -6,
      awayTeamScore: -8,
      amountBet: 100,
      gameId: game.id,
      participantId: participant.id,
    };

    const res = await server.post('/bets').send(newBet);
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('Should respond status 400 if the participant balance be lower than bet amount', async () => {
    const game = await createGame(false);
    const participant = await createParticipant();

    const newBet = {
      homeTeamScore: 5,
      awayTeamScore: 5,
      amountBet: 11000,
      gameId: game.id,
      participantId: participant.id,
    };

    const res = await server.post('/bets').send(newBet);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('Should return error BAD REQUEST when trying to finish a finished game', async () => {
    const game = await createGame(true);
    const participant = await createParticipant();
    const newBet = {
      homeTeamScore: 5,
      awayTeamScore: 5,
      amountBet: 968,
      gameId: game.id,
      participantId: participant.id,
    };
    const res = await server.post('/bets').send(newBet);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('Should return an BET when sending a correct body', async () => {
    const game = await createGame(false);
    const participant = await createParticipant();

    const newBet = {
      homeTeamScore: 5,
      awayTeamScore: 5,
      amountBet: 968,
      gameId: game.id,
      participantId: participant.id,
    };

    const res = await server.post('/bets').send(newBet);
    expect(res.body).toMatchObject<Bet>({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      homeTeamScore: expect.any(Number),
      awayTeamScore: expect.any(Number),
      amountBet: expect.any(Number),
      gameId: expect.any(Number),
      participantId: expect.any(Number),
      status: expect.any(String),
      amountWon: null,
    });
    const participantAmountAfterBet = Number(
      (await prisma.participant.findFirst({ where: { id: participant.id } }))?.balance,
    );
    expect(participantAmountAfterBet).toBe(participant.balance - newBet.amountBet);
  });
});
