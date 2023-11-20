import { faker } from '@faker-js/faker';
import prisma from '@/config/database';

export async function createParticipant() {
  const participant = await prisma.participant.create({
    data: {
      balance: 10000,
      name: faker.person.firstName(),
    },
  });
  return participant;
}
