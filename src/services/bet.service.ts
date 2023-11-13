
import { BetCreationDTO } from "@/protocols/bet.types";
import BetRepository from "@/repositories/bet.repository";

async function create(bet: BetCreationDTO) {
    const newBet = await BetRepository.create(bet);
    return newBet;
}
const BetService = { create };

export default BetService;