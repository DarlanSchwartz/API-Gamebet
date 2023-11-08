import { Router } from "express";
import participantRouter from "./participant.routes";

const MainRouter = Router();
MainRouter.use(participantRouter);
export default MainRouter;