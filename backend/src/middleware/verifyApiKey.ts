import { RequestHandler } from "express";
import { Project } from "../models/ProjectModel";
import errorCatcher from "../utils/errorCatcher";
import crypto from "crypto";
import { UNAUTHORIZED } from "../constants/http";

export const verifyApiKey: RequestHandler = errorCatcher(async (req, res, next) => {
    const candidateKey = req.body.apiKey;

    if (!candidateKey) {
        return res.status(UNAUTHORIZED).json({ error: "No API key provided" });
    }

    const candidateHash = crypto.createHash("sha256").update(candidateKey).digest("hex");

    const project = await Project.findOne({ apiKey: candidateHash });

    if (!project) {
        return res.status(UNAUTHORIZED).json({ error: "Invalid API key" });
    }

    req.project = {
        id: project._id as string,
        name: project.name,
        apiKey: project.apiKey,
        createdBy: project.createdBy.toString(),
    };

    next();
});

export default verifyApiKey;
