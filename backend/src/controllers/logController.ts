import errorCatcher from "../utils/errorCatcher";
import { Log } from "../models/LogModel";
import { Project } from "../models/ProjectModel";
import { OK, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, CREATED } from "../constants/http";
import { assertAppError } from "../utils/assertAppError";
import { AppErrorCode } from "../types/AppErrorCode";
import { Request, Response } from "express";

export const getLogsByProjectId = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findById(id);
    assertAppError(project != null, "Project not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    const logs = await Log.find({ project: id });
    return res.status(OK).json(logs);
});

export const getLogById = errorCatcher(async (req: Request, res: Response) => {
    const { id } = req.params;

    const log = await Log.findById(id);
    assertAppError(log != null, "Log not found", NOT_FOUND, AppErrorCode.OBJECT_NOT_FOUND);

    return res.status(OK).json(log);
});

export const postLog = errorCatcher(async (req: Request, res: Response) => {
    const { severity, source, timestamp, ...extraFields } = req.body;
    const project = req.project;

    assertAppError(
        severity != null || source != null || timestamp != null,
        "severity, source, and timestamp are required",
        BAD_REQUEST,
        AppErrorCode.MISSING_REQUEST_DATA
    );

    assertAppError(
        project != null,
        "Project not found or unauthorized",
        UNAUTHORIZED,
        AppErrorCode.MISSING_REQUEST_DATA
    );

    const log = new Log({
        severity,
        source,
        timestamp: new Date(timestamp),
        project: project.id,
        data: extraFields,
    });

    await log.save();

    return res.status(CREATED).json({
        message: "Log saved successfully",
    });
});
