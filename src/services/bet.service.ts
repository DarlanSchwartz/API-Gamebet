import { BetCreationDTO } from '@/protocols/bet.types';
import { CustomError, ErrorType } from '@/protocols/error.types';
import BetRepository from '@/repositories/bet.repository';
import GameRepository from '@/repositories/game.repository';
import ParticipantRepository from '@/repositories/participant.repository';

async function create(bet: BetCreationDTO) {
  const participant = await ParticipantRepository.getById(bet.participantId);

  if (!participant) {
    throw new CustomError(ErrorType.NOT_FOUND, 'Participant not found');
  }
  if (participant.balance < bet.amountBet) {
    throw new CustomError(ErrorType.BAD_REQUEST, 'Participant does not have enough balance');
  }

  const game = await GameRepository.getById(bet.gameId);

  if (!game) {
    throw new CustomError(ErrorType.NOT_FOUND, 'Game not found');
  }
  if (game.isFinished) {
    throw new CustomError(ErrorType.BAD_REQUEST, 'Game is finished');
  }
  const newBet = await BetRepository.create(bet);
  await ParticipantRepository.updateMoney(bet.participantId, participant.balance - bet.amountBet);
  return newBet;
}
const BetService = { create };

export default BetService;
