import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ParticipantService from '@/services/participant.service';
import { ParticipantCreationDTO } from '@/protocols/participant.types';

async function getAll(req: Request, res: Response) {
  const participants = await ParticipantService.getAll();
  return res.send(participants);
}

async function create(req: Request, res: Response) {
  const participant = req.body as ParticipantCreationDTO;
  const newParticipant = await ParticipantService.create(participant);
  return res.status(httpStatus.CREATED).send(newParticipant);
}

const ParticipantController = { getAll, create };

export default ParticipantController;
