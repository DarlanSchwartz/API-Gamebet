import { Bet, Game } from "@prisma/client";

export function isWinningBet(game: Pick<Game, "homeTeamScore" | "awayTeamScore">, bet: Pick<Bet, "awayTeamScore" | "homeTeamScore">) {
    const isPositiveScore = bet.homeTeamScore >= 0 && bet.awayTeamScore >= 0;

    const result =
        isPositiveScore &&
        ((game.homeTeamScore > game.awayTeamScore &&
            bet.homeTeamScore > bet.awayTeamScore) ||
        (game.homeTeamScore < game.awayTeamScore &&
            bet.homeTeamScore < bet.awayTeamScore) ||
        (game.homeTeamScore === game.awayTeamScore &&
            bet.homeTeamScore === bet.awayTeamScore));

    return result;
}

export function doesNotContainHTML(value: string) {
    const htmlRegex = /<[^>]*>/;
    return !htmlRegex.test(value);
}