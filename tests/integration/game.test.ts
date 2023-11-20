import { Game } from '@prisma/client';
import supertest from 'supertest';
import httpStatus from 'http-status';
import { createBet } from '../factories/bet.factory';
import { createGame } from '../factories/game.factory';
import { clearDatabase, getAmount } from '../helpers';
import { createParticipant } from '../factories/participant.factory';
import app from '@/app';
import prisma from '@/config/database';

const server = supertest(app);

beforeEach(async () => {
  await clearDatabase();
});

describe('POST /games', () => {
  it('Should return 422 when body is empty or incorrect', async () => {
    const res = await server.post('/games');
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('Should create and return the created game', async () => {
    const newGame = {
      homeTeamName: 'Grêmio',
      awayTeamName: 'Inter',
    };
    const res = await server.post('/games').send(newGame);
    expect(res.body).toMatchObject<Game>({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      homeTeamName: expect.any(String),
      awayTeamName: expect.any(String),
      homeTeamScore: expect.any(Number),
      awayTeamScore: expect.any(Number),
      isFinished: expect.any(Boolean),
    });
    expect(
      await prisma.game.findFirst({
        where: { id: res.body.id },
      }),
    ).toMatchObject({
      id: res.body.id,
    });
  });
});

describe('POST /games/:id/finish', () => {
  it('Sould return 422 when body is empty or incorrect', async () => {
    const res = await server.post('/games/1/finish');
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('Sould return 404 when id is invalid', async () => {
    const newGame = {
      homeTeamScore: 9,
      awayTeamScore: 9,
    };

    const res = await server.post('/games/htttt/finish').send(newGame);
    expect(res.status).toBe(httpStatus.NOT_FOUND);
  });

  it("Should return a text 'This game already finished' if try to finish in a finished game", async () => {
    const game = await createGame(true);
    const newGame = {
      homeTeamScore: 9,
      awayTeamScore: 9,
    };
    const res = await server.post(`/games/${game.id}/finish`).send(newGame);
    expect(res.text).toBe('Bad Request: Game is already finished');
  });

  it('Should return a game that  is finished is true and the score is the same that the body', async () => {
    const game = await createGame(false);
    const secondGame = {
      homeTeamScore: 9,
      awayTeamScore: 9,
    };
    const res = await server.post(`/games/${game.id}/finish`).send(secondGame);
    expect(res.body).toMatchObject<Game>({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      homeTeamName: expect.any(String),
      awayTeamName: expect.any(String),
      homeTeamScore: secondGame.homeTeamScore,
      awayTeamScore: secondGame.awayTeamScore,
      isFinished: true,
    });
    expect(
      (
        await prisma.game.findFirst({
          where: { id: game.id },
        })
      )?.isFinished,
    ).toBe(true);
  });

  it('Should the bets that  have the diferent score be lost and the amount 0', async () => {
    const game = await createGame(false);
    const participant = await createParticipant();
    const secondGame = {
      homeTeamScore: 9,
      awayTeamScore: 9,
    };
    const betParams = {
      homeTeamScore: 3,
      awayTeamScore: 4,
    };
    const bet = await createBet(participant.id, game.id, betParams);

    await server.post(`/games/${game.id}/finish`).send(secondGame);
    expect(
      (
        await prisma.bet.findFirst({
          where: { id: bet.id },
        })
      )?.status,
    ).toBe('LOST');
    expect(
      (
        await prisma.bet.findFirst({
          where: { id: bet.id },
        })
      )?.amountWon,
    ).toBe(0);
  });

  it('Should the bets that have the same score be WON and the amount be the equal to the rule', async () => {
    const game = await createGame(false);
    const participant = await createParticipant();
    const secondGame = {
      homeTeamScore: 2,
      awayTeamScore: 2,
    };
    const betParams = {
      homeTeamScore: 2,
      awayTeamScore: 2,
    };

    const bet = await createBet(participant.id, game.id, betParams);
    const betsData = await getAmount({
      awayTeamScore: secondGame.awayTeamScore,
      homeTeamScore: secondGame.homeTeamScore,
      gameId: game.id,
    });
    await server.post(`/games/${game.id}/finish`).send(secondGame);
    expect(
      (
        await prisma.bet.findFirst({
          where: { id: bet.id },
        })
      )?.status,
    ).toBe('WON');
    expect(
      (
        await prisma.bet.findFirst({
          where: { id: bet.id },
        })
      )?.amountWon,
    ).toBe((bet.amountBet / Number(betsData.wonBets)) * Number(betsData.bets) * 0.7);
  });
});

describe('GET /games', () => {
  it('Should return all games', async () => {
    await createGame(false);
    const { body } = await server.get('/games');
    expect(body).toEqual([
      {
        id: expect.any(Number),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        homeTeamScore: expect.any(Number),
        awayTeamScore: expect.any(Number),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        isFinished: expect.any(Boolean),
      },
    ]);
  });
});

describe('GET /games/:id', () => {
  it('Should return an 404 error when trying to get a game and passing an invalid id', async () => {
    const res = await server.get(`/games/htttt`);
    expect(res.status).toBe(httpStatus.NOT_FOUND);
  });

  it('Should return the game of id X', async () => {
    const participant = await createParticipant();
    const game = await createGame(false);
    await createBet(participant.id, game.id);
    const { body } = await server.get(`/games/${game.id}`);
    expect(body).toEqual({ ...game, createdAt: expect.any(String), updatedAt: expect.any(String) });
  });
});
