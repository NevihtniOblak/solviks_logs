import errorCatcher from "../utils/errorCatcher";
import { Request, Response } from "express";
import crypto from "crypto";
import { Project } from "../models/ProjectModel";
import { Log } from "../models/LogModel";
import { OK, BAD_REQUEST, NOT_FOUND, CREATED } from "../constants/http";
import { assertAppError } from "../utils/assertAppError";
import { AppErrorCode } from "../types/AppErrorCode";

export const getAllProjects = errorCatcher(async (req: Request, res: Response) => {
    const projects = await Project.find();
    return res.status(OK).json(projects);
});

export const getProjectById = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findOne({ _id: id });

    assertAppError(project != null, "Project not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    return res.status(OK).json(project);
});

export const createProject = errorCatcher(async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.user?.id;

    assertAppError(name != null, "Project name is required", BAD_REQUEST, AppErrorCode.MISSING_REQUEST_DATA);
    assertAppError(userId != null, "User not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    const apiKey = crypto.randomBytes(32).toString("hex");

    const project = new Project({
        name: name,
        apiKey: apiKey,
        createdBy: userId,
    });
    await project.save();

    const responseProject = {
        _id: project._id,
        name: project.name,
    };

    res.status(CREATED).json({
        project: responseProject,
        apiKey: apiKey,
    });
});

export const regenerateProjectKey = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findById(id);
    assertAppError(project != null, "Project not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    const newApiKey = crypto.randomBytes(32).toString("hex");
    project.apiKey = newApiKey;
    await project.save();

    return res.status(OK).json({ apiKey: newApiKey });
});

export const deleteProject = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    assertAppError(project != null, "Project not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    await Log.deleteMany({ project: id });

    return res.status(OK).json({ message: "Project deleted successfully" });
});
