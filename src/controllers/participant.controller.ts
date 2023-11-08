import { Request, Response } from "express";
import ParticipantService from "@/services/participant.service";
import { ParticipantCreationDTO } from "@/protocols/participant.types";
import httpStatus from "http-status";

async function getAll(req: Request, res: Response) {
  const participants = await ParticipantService.getAll();
  return res.send(participants);
}

async function create(req: Request, res: Response) {
  const participant = req.body as ParticipantCreationDTO;
  await ParticipantService.create(participant);
  return res.sendStatus(httpStatus.CREATED);
}

const ParticipantController = { getAll, create };

export default ParticipantController;