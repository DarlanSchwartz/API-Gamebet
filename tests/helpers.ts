import prisma from "@/config/database"
type UpdateBetDTO = {
    awayTeamScore: number;
    homeTeamScore: number;
    gameId: number;
}
type AmountDTO = {
    Amount: number
}
export async function clearDatabase() {
    await prisma.bet.deleteMany();
    await prisma.game.deleteMany();
    await prisma.participant.deleteMany();
}

export async function getAmount(gameData: UpdateBetDTO) {

    const wonBets = await prisma.$queryRaw<Array<AmountDTO>> `
    SELECT SUM("bets"."amountBet") as "Amount" FROM "bets"
    WHERE "bets"."gameId" = ${gameData.gameId} AND
    "bets"."awayTeamScore" = ${gameData.homeTeamScore} AND
    "bets"."homeTeamScore" = ${gameData.homeTeamScore}
`;
    const bets = await prisma.$queryRaw<Array<AmountDTO>> `
    SELECT SUM("bets"."amountBet") as "Amount" FROM "bets"
    WHERE "bets"."gameId" = ${gameData.gameId}

`;
    return {
        wonBets: wonBets[0].Amount,
        bets: bets[0].Amount
    };
}