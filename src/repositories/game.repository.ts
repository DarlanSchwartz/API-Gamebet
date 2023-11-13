import prisma from "@/database/database.connection";
import { GameCreationDTO, GameFinishDTO } from "@/protocols/game.types";

async function create(game: GameCreationDTO) {
    const result = await prisma.game.create({
        data: game
    });
    return result;
}

async function getAll() {
    const result = await prisma.game.findMany();
    return result;
}

async function getById(id: number) {
    const result = await prisma.game.findUnique({
        where: {
            id
        }
    });
    return result;
}

async function finish(id: number, game: GameFinishDTO) {
    const result = await prisma.game.update({
        where: {
            id
        },
        data: {
            ...game,
            isFinished: true,
            updatedAt: new Date()
        }
    });
    return result;
}

const GameRepository = { create, getAll, getById, finish };
export default GameRepository;