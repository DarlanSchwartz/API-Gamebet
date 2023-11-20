import { Router } from 'express';
import validateSchema from '@/middlewares/validateSchema.middleware';
import BetCreationSchema from '@/schemas/bet.schemas';
import BetController from '@/controllers/bet.controller';

const betRouter = Router();
betRouter.post('/bets', validateSchema(BetCreationSchema), BetController.create);
export default betRouter;
