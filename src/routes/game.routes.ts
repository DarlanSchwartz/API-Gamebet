import { Router } from "express";
import validateSchema from "@/middlewares/validateSchema.middleware";
import GameController from "@/controllers/game.controller";
import {GameCreationSchema, GameFinishSchema} from "@/schemas/game.schemas";

const gameRouter = Router();
gameRouter.get("/games", GameController.getAll);
gameRouter.get("/games/:id", GameController.getById);
gameRouter.post("/games", validateSchema(GameCreationSchema), GameController.create);
gameRouter.post("/games/:id/finish", validateSchema(GameFinishSchema), GameController.update);
export default gameRouter;