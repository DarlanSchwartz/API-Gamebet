import JoiBase, { Root } from "joi";
import { ParticipantCreationDTO } from "@/protocols/participant.types";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate) as Root;

const ParticipantCreationSchema = Joi.object<ParticipantCreationDTO>({
  name: Joi.string().required(),
  balance: Joi.number().min(1000).required()
});

export default ParticipantCreationSchema;