import { RequestHandler } from "express";
import { Project } from "../models/ProjectModel";
import errorCatcher from "../utils/errorCatcher";
import crypto from "crypto";
import { UNAUTHORIZED } from "../constants/http";
import { assertAppError } from "../utils/assertAppError";
import { AppErrorCode } from "../types/AppErrorCode";
import { Request, Response } from "express";

export const verifyApiKey: RequestHandler = errorCatcher(async (req: Request, res: Response, next) => {
    const candidateKey = req.headers["x-api-key"] as string | undefined;

    assertAppError(candidateKey != null, "No API key provided", UNAUTHORIZED, AppErrorCode.MISSING_REQUEST_DATA);

    const candidateHash = crypto.createHash("sha256").update(candidateKey).digest("hex");

    const project = await Project.findOne({ apiKey: candidateHash });

    assertAppError(project != null, "Invalid API key provided", UNAUTHORIZED, AppErrorCode.INVALID_API_KEY);

    req.project = {
        id: project._id as string,
        name: project.name,
        apiKey: project.apiKey,
        createdBy: project.createdBy.toString(),
    };

    next();
});

export default verifyApiKey;
