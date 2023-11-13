import { Game } from "@prisma/client";

export type GameCreationDTO = Pick<Game, "homeTeamName" | "awayTeamName">;
export type GameFinishDTO = Pick<Game, "homeTeamScore" | "awayTeamScore">;