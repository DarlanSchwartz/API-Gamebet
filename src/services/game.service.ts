import { CustomError, ErrorType } from "@/protocols/error.types";
import { GameCreationDTO, GameFinishDTO } from "@/protocols/game.types";
import GameRepository from "@/repositories/game.repository";
async function getAll() {
    const games = await GameRepository.getAll();
    return games;
}

async function create(game: GameCreationDTO) {
    const result = await GameRepository.create(game);
    if (!result) throw new CustomError(ErrorType.INTERNAL, "Game not created");
    return result;
}

async function getById(id: number) {
    const result = await GameRepository.getById(id);
    if (!result) throw new CustomError(ErrorType.NOT_FOUND, "Game not found");
    return result;
}

async function finish(id: number, game: GameFinishDTO) {
    const currentGame = await GameRepository.getById(id);
    if (!currentGame) throw new CustomError(ErrorType.NOT_FOUND, "Game not found");
    if (currentGame.isFinished) throw new CustomError(ErrorType.BAD_REQUEST, "Game is already finished");
    const result = await GameRepository.finish(id, game);
    return result;
}

const GameService = { getAll, create, getById, finish };

export default GameService;