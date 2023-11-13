import { Bet } from "@prisma/client";
export type BetCreationDTO = Pick<Bet, "homeTeamScore" | "awayTeamScore" | "amountBet" | "gameId" | "participantId">;