import { Participant } from '@prisma/client';

export type ParticipantCreationDTO = Pick<Participant, 'name' | 'balance'>;
