import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UNAUTHORIZED } from "../constants/http";
import { JWT_SECRET } from "../constants/env";

interface JwtPayload {
    id: string;
    role: string;
}

const authenticate: RequestHandler = (req, res, next) => {
    const token = req.cookies.accessToken as string | undefined;

    if (!token) {
        const err = new Error("No token provided");
        (err as any).status = UNAUTHORIZED;
        throw err;
    }

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.user = { id: payload.id, role: payload.role };

    next();
};

export default authenticate;
