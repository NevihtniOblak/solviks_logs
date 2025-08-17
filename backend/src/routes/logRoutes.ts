import { Router } from "express";
import { getAllLogs, getLogsByProjectId, getLogById, postLog } from "../controllers/logController";
import { verifyApiKey } from "../middleware/verifyApiKey";

const logRoutes = Router();

logRoutes.get("/", getAllLogs);
logRoutes.get("/project/:projectId", getLogsByProjectId);
logRoutes.get("/:id", getLogById);
logRoutes.post("/", verifyApiKey, postLog);

export default logRoutes;
[];
