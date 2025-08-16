import { Router } from "express";
import { getAllLogs, getLogsByProjectId, getLogById, postLog } from "../controllers/logController";
import { authorize } from "../middleware/authorize";

const logRoutes = Router();

logRoutes.get("/", getAllLogs);
logRoutes.get("/project/:projectId", getLogsByProjectId);
logRoutes.get("/:id", getLogById);
logRoutes.post("/", authorize("admin"), postLog);

export default logRoutes;
