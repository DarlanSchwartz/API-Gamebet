import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";
import { BetCreationDTO } from "@/protocols/bet.types";

const Joi = JoiBase.extend(JoiDate) as Root;

const BetCreationSchema = Joi.object<BetCreationDTO>({
    homeTeamScore: Joi.number().min(0).required(),
    awayTeamScore: Joi.number().min(0).required(),
    amountBet: Joi.number().positive().not(0).required(),
    gameId: Joi.number().min(1).required(),
    participantId: Joi.number().min(1).required()
});

export default BetCreationSchema;