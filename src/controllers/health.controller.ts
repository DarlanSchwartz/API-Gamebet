import { Request, Response } from "express";

async function getHealth(req: Request, res: Response) {
    return res.send("I'm ok!");
}
const HealthController = { getHealth };
export default HealthController;