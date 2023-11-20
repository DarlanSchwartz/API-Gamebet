import HealthController from "@/controllers/health.controller";
import { Router } from "express";

const healthRouter = Router();
healthRouter.get("/health", HealthController.getHealth);
export default healthRouter;