import { Router } from "express";
import { getLogsByProjectId, getLogById, postLog } from "../controllers/logController";
import { verifyApiKey } from "../middleware/verifyApiKey";
import authenticate from "../middleware/authenticate";

const logRoutes = Router();

logRoutes.get("/project/:id", authenticate, getLogsByProjectId);
logRoutes.get("/:id", authenticate, getLogById);
logRoutes.post("/", verifyApiKey, postLog);

export default logRoutes;
[];
