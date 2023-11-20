import JoiBase, { Root } from 'joi';
import JoiDate from '@joi/date';
import { ParticipantCreationDTO } from '@/protocols/participant.types';

const Joi = JoiBase.extend(JoiDate) as Root;

const ParticipantCreationSchema = Joi.object<ParticipantCreationDTO>({
  name: Joi.string()
    .trim()
    .pattern(/^[^<>]+$/)
    .required(),
  balance: Joi.number().min(1000).required(),
});

export default ParticipantCreationSchema;
