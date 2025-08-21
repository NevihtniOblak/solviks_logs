import { RequestHandler } from "express";
import { FORBIDDEN } from "../constants/http";
import { assertAppError } from "../utils/assertAppError";
import { AppErrorCode } from "../types/AppErrorCode";
import { Request, Response } from "express";

export const authorize = (requiredRole: "admin" | "user"): RequestHandler => {
    return (req: Request, res: Response, next) => {
        const role = req.user?.role;

        assertAppError(
            role === requiredRole,
            "Forbidden: insufficient rights",
            FORBIDDEN,
            AppErrorCode.INSUFFICIENT_RIGHTS
        );

        next();
    };
};
