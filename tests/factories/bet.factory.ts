import prisma from "@/config/database"
import { Bet } from "@prisma/client"

export async function createBet(participantId: number, gameId: number, betParams?: { homeTeamScore: number; awayTeamScore: number; }) {
    let newBet: Bet;
    if (betParams?.awayTeamScore !== undefined) {
        newBet = await prisma.bet.create({
            data: {
                homeTeamScore: betParams.homeTeamScore,
                awayTeamScore: betParams.awayTeamScore,
                participantId: participantId,
                amountBet: 500,
                gameId: gameId,
                status: "PENDING"
            }
        });
    } else {
        newBet = await prisma.bet.create({
            data: {
                homeTeamScore: 2,
                awayTeamScore: 2,
                participantId: participantId,
                amountBet: 500,
                gameId: gameId,
                status: "PENDING"
            }
        });
    }

    return newBet;
} 