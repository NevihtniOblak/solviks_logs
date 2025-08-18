import { RequestHandler } from "express";
import { UNAUTHORIZED, FORBIDDEN } from "../constants/http";

export const authorize = (requiredRole: "admin" | "user"): RequestHandler => {
    return (req, res, next) => {
        const role = req.user?.role;

        if (!role) {
            const err = new Error("Not authenticated");
            (err as any).status = UNAUTHORIZED;
            throw err;
        }

        if (role !== requiredRole) {
            const err = new Error("Forbidden: insufficient rights");
            (err as any).status = FORBIDDEN;
            throw err;
        }

        next();
    };
};
