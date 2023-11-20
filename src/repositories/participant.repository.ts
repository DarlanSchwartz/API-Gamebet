import prisma from '@/database/database.connection';
import { ParticipantCreationDTO } from '@/protocols/participant.types';

async function create(participant: ParticipantCreationDTO) {
  const result = await prisma.participant.create({
    data: participant,
  });

  return result;
}

async function getAll() {
  const result = await prisma.participant.findMany();
  return result;
}

async function updateMoney(id: number, newBalance: number) {
  const result = await prisma.participant.update({
    where: {
      id,
    },
    data: {
      balance: newBalance,
    },
  });
  return result;
}

async function getById(id: number) {
  const result = await prisma.participant.findUnique({
    where: {
      id,
    },
  });
  return result;
}

const ParticipantRepository = { create, getAll, getById, updateMoney };

export default ParticipantRepository;
