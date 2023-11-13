import { GameCreationDTO, GameFinishDTO } from "@/protocols/game.types";
import GameRepository from "@/repositories/game.repository";
async function getAll() {
    const games = await GameRepository.getAll();
    return games;
}

async function create(game: GameCreationDTO) {
    const result = await GameRepository.create(game);
    return result;
}

async function getById(id: number) {
    const result = await GameRepository.getById(id);
    return result;
}

async function update(id: number, game: GameFinishDTO) {
    const result = await GameRepository.update(id, game);
    return result;
}

const GameService = { getAll, create, getById, update };

export default GameService;