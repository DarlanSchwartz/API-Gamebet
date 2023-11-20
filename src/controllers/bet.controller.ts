import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BetCreationDTO } from '@/protocols/bet.types';
import BetService from '@/services/bet.service';

async function create(req: Request, res: Response) {
  const bet = req.body as BetCreationDTO;
  const newBet = await BetService.create(bet);
  return res.status(httpStatus.CREATED).send(newBet);
}

const BetController = { create };

export default BetController;
