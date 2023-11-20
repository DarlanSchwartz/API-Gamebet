import JoiBase, { Root } from 'joi';
import JoiDate from '@joi/date';
import { GameCreationDTO, GameFinishDTO } from '@/protocols/game.types';

const Joi = JoiBase.extend(JoiDate) as Root;

const GameCreationSchema = Joi.object<GameCreationDTO>({
  homeTeamName: Joi.string()
    .trim()
    .pattern(/^[^<>]+$/)
    .required(),
  awayTeamName: Joi.string()
    .trim()
    .pattern(/^[^<>]+$/)
    .required(),
});

const GameFinishSchema = Joi.object<GameFinishDTO>({
  homeTeamScore: Joi.number().min(0).required(),
  awayTeamScore: Joi.number().min(0).required(),
});

export { GameCreationSchema, GameFinishSchema };
