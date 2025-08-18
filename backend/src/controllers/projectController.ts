import errorCatcher from "../utils/errorCatcher";
import { Request, Response } from "express";
import crypto from "crypto";
import { Project } from "../models/ProjectModel";
import { Log } from "../models/LogModel";
import { OK, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, CREATED } from "../constants/http";

export const getAllProjects = errorCatcher(async (req: Request, res: Response) => {
    const projects = await Project.find();
    return res.status(OK).json({ projects });
});

export const getProjectById = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findOne({ _id: id });
    if (!project) {
        return res.status(NOT_FOUND).json({ error: "Project not found" });
    }

    return res.status(OK).json({ project });
});

export const createProject = errorCatcher(async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.user?.id;

    if (!name) {
        return res.status(BAD_REQUEST).json({ error: "Project name is required" });
    }
    if (!userId) {
        return res.status(UNAUTHORIZED).json({ error: "Unauthorized" });
    }

    const apiKey = crypto.randomBytes(32).toString("hex");

    const project = new Project({
        name: name,
        apiKey: apiKey,
        createdBy: userId,
    });
    await project.save();

    res.status(CREATED).json({
        apiKey: apiKey,
    });
});

export const deleteProject = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
        return res.status(NOT_FOUND).json({ error: "Project not found" });
    }

    await Log.deleteMany({ project: id });

    return res.status(OK).send();
});
