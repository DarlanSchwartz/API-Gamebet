import prisma from "@/config/database"
import { faker } from "@faker-js/faker";
export async function createGame(finished: boolean) {
    const game = await prisma.game.create({
        data: {
            awayTeamName: faker.animal.cat(),
            homeTeamName: faker.animal.bird(),
            isFinished: finished,
        }
    });
    return game;
}