import { Router } from 'express';
import validateSchema from '@/middlewares/validateSchema.middleware';
import ParticipantCreationSchema from '@/schemas/participant.schemas';
import ParticipantController from '@/controllers/participant.controller';

const participantRouter = Router();

participantRouter.get('/participants', ParticipantController.getAll);
participantRouter.post('/participants', validateSchema(ParticipantCreationSchema), ParticipantController.create);

export default participantRouter;
