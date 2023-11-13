-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "homeTeamScore" INTEGER NOT NULL,
    "awayTeamScore" INTEGER NOT NULL,
    "amountBet" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "amountWon" INTEGER,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "homeTeamName" VARCHAR(255) NOT NULL,
    "awayTeamName" VARCHAR(255) NOT NULL,
    "homeTeamScore" INTEGER NOT NULL DEFAULT 0,
    "awayTeamScore" INTEGER NOT NULL DEFAULT 0,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
