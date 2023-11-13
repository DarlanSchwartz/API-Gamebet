import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";
import { BetCreationDTO } from "@/protocols/bet.types";

const Joi = JoiBase.extend(JoiDate) as Root;

const BetCreationSchema = Joi.object<BetCreationDTO>({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required(),
    amountBet: Joi.number().required(),
    gameId: Joi.number().required(),
    participantId: Joi.number().required()
});

export default BetCreationSchema;