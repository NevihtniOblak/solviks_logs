import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/env";
import { AppErrorCode } from "../types/AppErrorCode";

export interface JwtPayload {
    id: string;
    role: string;
}

export const verifyJwt = (token: string): { error?: AppErrorCode; payload?: JwtPayload } => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return { payload };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return { error: AppErrorCode.EXPIRED_TOKEN };
        } else if (error instanceof jwt.JsonWebTokenError) {
            return { error: AppErrorCode.INVALID_TOKEN };
        } else if (error instanceof jwt.NotBeforeError) {
            return { error: AppErrorCode.INACTIVE_TOKEN };
        }
        return { error: AppErrorCode.INVALID_TOKEN };
    }
};

export const signJwt = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });
};
