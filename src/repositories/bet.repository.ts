import prisma from "@/database/database.connection";
import { BetCreationDTO } from "@/protocols/bet.types";

async function create(bet: BetCreationDTO) {
    const result = await prisma.bet.create({
        data: {
            gameId: bet.gameId,
            awayTeamScore: bet.awayTeamScore,
            amountBet: bet.amountBet,
            homeTeamScore: bet.homeTeamScore,
            participantId: bet.participantId,
            status: "PENDING"
        }
    });
    return result;
}

const BetRepository = { create };
export default BetRepository;