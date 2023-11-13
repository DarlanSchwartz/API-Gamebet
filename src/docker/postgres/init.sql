CREATE TABLE participants (
    "id" SERIAL PRIMARY KEY NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "balance" integer NOT NULL
);

CREATE TABLE games (
    "id" SERIAL PRIMARY KEY NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "homeTeamName" VARCHAR(255) NOT NULL,
    "awayTeamName" VARCHAR(255) NOT NULL,
    "homeTeamScore" integer NOT NULL DEFAULT 0,
    "awayTeamScore" integer NOT NULL DEFAULT 0,
    "isFinished" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE bets (
    "id" SERIAL PRIMARY KEY NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "homeTeamScore" integer NOT NULL,
    "awayTeamScore" integer NOT NULL,
    "amountBet" integer NOT NULL,
    "gameId" integer REFERENCES games(id) ON DELETE CASCADE NOT NULL,
    "participantId" integer REFERENCES participants(id) ON DELETE CASCADE NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "amountWon" integer
);