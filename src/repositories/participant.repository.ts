import prisma from "@/database/database.connection";
import { ParticipantCreationDTO } from "@/protocols/participant.types";

async function create(participant: ParticipantCreationDTO) {
    const result = await prisma.participant.create({
        data: participant
    });

    return result;
}

async function getAll() {
    const result = await prisma.participant.findMany();
    return result;
}

const ParticipantRepository = { create, getAll };

export default ParticipantRepository;
