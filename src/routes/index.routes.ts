import { Router } from "express";
import participantRouter from "./participant.routes";
import gameRouter from "./game.routes";
import betRouter from "./bet.routes";

const MainRouter = Router();
MainRouter.use(participantRouter);
MainRouter.use(gameRouter);
MainRouter.use(betRouter);
export default MainRouter;