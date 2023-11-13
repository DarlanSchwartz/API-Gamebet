import { Request, Response } from "express";
import httpStatus from "http-status";
import { GameCreationDTO, GameFinishDTO } from "@/protocols/game.types";
import GameService from "@/services/game.service";

async function create(req: Request, res: Response) {
  const game = req.body as GameCreationDTO;
  const newGame = await GameService.create(game);
  return res.status(httpStatus.CREATED).send(newGame);
}

async function getAll(req: Request, res: Response) {
    const games = await GameService.getAll();
    return res.send(games);
  }

  async function getById(req: Request, res: Response) {
    const id = req.params.id;
    if(!id) return res.sendStatus(httpStatus.BAD_REQUEST);
    const game = await GameService.getById(Number(id));
    return res.send(game);
  }

  async function update(req: Request, res: Response) {
    const id = req.params.id;
    if(!id) return res.sendStatus(httpStatus.BAD_REQUEST);
    const game = req.body as GameFinishDTO;
    const updatedGame = await GameService.update(Number(id), game);
    return res.send(updatedGame);
  }

const GameController = { create , getAll , getById , update};

export default GameController;