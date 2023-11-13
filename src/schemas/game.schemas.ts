import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";
import { GameCreationDTO, GameFinishDTO } from "@/protocols/game.types";

const Joi = JoiBase.extend(JoiDate) as Root;

const GameCreationSchema = Joi.object<GameCreationDTO>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required()
});

const GameFinishSchema = Joi.object<GameFinishDTO>({
  homeTeamScore: Joi.number().positive().required(),
  awayTeamScore: Joi.number().positive().required()
});

export {GameCreationSchema, GameFinishSchema};