import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";
import { GameCreationDTO } from "@/protocols/game.types";

const Joi = JoiBase.extend(JoiDate) as Root;

const GameCreationSchema = Joi.object<GameCreationDTO>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required()
});

export default GameCreationSchema;