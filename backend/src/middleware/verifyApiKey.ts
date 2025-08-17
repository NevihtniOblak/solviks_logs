import { RequestHandler } from "express";
import { Project } from "../models/ProjectModel";
import errorCatcher from "../utils/errorCatcher";
import crypto from "crypto";

export const verifyApiKey: RequestHandler = errorCatcher(async (req, res, next) => {
    const candidateKey = req.header("x-api-key") || req.body.apiKey;

    if (!candidateKey) {
        return res.status(401).json({ error: "No API key provided" });
    }

    const candidateHash = crypto.createHash("sha256").update(candidateKey).digest("hex");

    const project = await Project.findOne({ apiKey: candidateHash });

    if (!project) {
        return res.status(401).json({ error: "Invalid API key" });
    }

    (req as any).project = project;
    next();
});

export default verifyApiKey;
