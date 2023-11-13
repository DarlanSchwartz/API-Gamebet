import { CustomError, ErrorType } from "@/protocols/error.types";
import { ParticipantCreationDTO } from "@/protocols/participant.types";
import ParticipantRepository from "@/repositories/participant.repository";

async function getAll() {
  const participants = await ParticipantRepository.getAll();
  return participants;
}

async function create(participant: ParticipantCreationDTO) {
  const result = await ParticipantRepository.create(participant);
  return result;
}

const ParticipantService = { getAll, create };

export default ParticipantService;