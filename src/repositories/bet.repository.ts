import prisma from "@/database/database.connection";
import { BetCreationDTO, BetResolve } from "@/protocols/bet.types";

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

async function updateWinnersAndLosers(bets: BetResolve[]) {
    const result = await prisma.$transaction(bets.map((bet) => {
        return prisma.bet.update({
            where: {
                id: bet.betId
            },
            data: {
                status: bet.isWinner ? "WON" : "LOST",
                amountWon: bet.amountWon,
                participants: {
                    update: {
                        data: {
                            balance: { increment: bet.amountWon }
                        }
                    }
                }
            },
            select: {
                participants: {
                    select: {
                        name: true,
                        balance: true,
                        id: true
                    }
                },
                amountWon: true,
                status: true,
                id: true,
                gameId: true,
                awayTeamScore: true,
                amountBet: true,
                homeTeamScore: true,
                participantId: true,
                createdAt: true,
            }
        });
    }));

    return result;
}

const BetRepository = { create, updateWinnersAndLosers };
export default BetRepository;