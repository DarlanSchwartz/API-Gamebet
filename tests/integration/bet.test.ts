import prisma from "@/config/database"
import { createGame } from "../factories/game.factory"
import { createParticipant } from "../factories/participant.factory"
import { clearDatabase } from "../helpers"
import app from "@/app"
import supertest from "supertest"
import { Bet } from "@prisma/client"

const server = supertest(app);

beforeEach(async () => {
    await clearDatabase()
});

describe('POST /bets',  () => {
    it('Shold return 422 when body is empity or incorrect', async () => {
        const res = await server.post("/bets")
        expect(res.status).toBe(422)
    })

    it('Should response status be 400 if the participant balance be lower than bet amount', async () => {
        const game = await createGame(false)
        const participant = await createParticipant()

        const newBet = {
            homeTeamScore: 5,
            awayTeamScore: 5,
            amountBet: 11000,
            gameId: game.id,
            participantId: participant.id,
        }

        const res = await server.post("/bets").send(newBet)
        expect(res.status).toBe(400)
    })

    it("should return a text 'can not bet in a finished' if try to bet in a finished game", async () => {
        const game = await createGame(true);
        const participant = await createParticipant();
        const newBet = {
            homeTeamScore: 5,
            awayTeamScore: 5,
            amountBet: 968,
            gameId: game.id,
            participantId: participant.id,
        }

        const res = await server.post("/bets").send(newBet)
        expect(res.text).toBe('Bad Request: Game is finished')
    })

    it('shold return an BET obeject if the body is correct', async () => {
        const game = await createGame(false)
        const participant = await createParticipant()

        const newBet = {
            homeTeamScore: 5,
            awayTeamScore: 5,
            amountBet: 968,
            gameId: game.id,
            participantId: participant.id,
        }

        const res = await server.post("/bets").send(newBet)
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
            amountWon: null
        })
        const participantAmountAfterBet = Number((await prisma.participant.findFirst({ where: { id: participant.id } }))?.balance)
        expect(participantAmountAfterBet).toBe(participant.balance - newBet.amountBet)
    })

})