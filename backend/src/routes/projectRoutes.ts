import { Router } from "express";
import { getAllProjects, getProjectById, createProject } from "../controllers/projectController";
import { authorize } from "../middleware/authorize";

const projectRoutes = Router();

projectRoutes.get("/", getAllProjects);
projectRoutes.get("/:id", getProjectById);
projectRoutes.post("/", authorize("admin"), createProject);

export default projectRoutes;
