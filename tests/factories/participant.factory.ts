import prisma from "@/config/database"
import { faker } from "@faker-js/faker";

export async function createParticipant() {
    const participant = await prisma.participant.create({
        data: {
            balance: 10000,
            name: faker.person.firstName()
        }
    })
    return participant
}