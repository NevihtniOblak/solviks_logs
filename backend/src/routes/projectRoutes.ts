import { Router } from "express";
import {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    regenerateProjectKey,
} from "../controllers/projectController";
import { authorize } from "../middleware/authorize";

const projectRoutes = Router();

projectRoutes.get("/", getAllProjects);
projectRoutes.get("/:id", getProjectById);
projectRoutes.post("/", createProject);
projectRoutes.put("/:id", regenerateProjectKey);
projectRoutes.delete("/:id", authorize("admin"), deleteProject);

export default projectRoutes;
