import errorCatcher from "../utils/errorCatcher";
import { Log } from "../models/LogModel";
import { Project } from "../models/ProjectModel";
import crypto from "crypto";
import { OK, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, CREATED } from "../constants/http";

export const getAllLogs = errorCatcher(async (req, res) => {});

export const getLogsByProjectId = errorCatcher(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
        return res.status(NOT_FOUND).json({ message: "Project not found" });
    }

    const logs = await Log.find({ project: id });
    return res.status(OK).json(logs);
});

export const getLogById = errorCatcher(async (req, res) => {
    const { id } = req.params;

    const log = await Log.findById(id);
    if (!log) {
        return res.status(NOT_FOUND).json({ message: "Log not found" });
    }

    return res.status(OK).json(log);
});

export const postLog = errorCatcher(async (req, res) => {
    const { severity, source, timestamp, ...extraFields } = req.body;
    const project = req.project;

    if (!severity || !source || !timestamp) {
        return res.status(BAD_REQUEST).json({ message: "severity, source, and timestamp are required" });
    }
    if (!project) {
        return res.status(UNAUTHORIZED).json({ message: "Project not found or unauthorized" });
    }

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
