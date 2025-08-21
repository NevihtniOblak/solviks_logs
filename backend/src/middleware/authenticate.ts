import { RequestHandler } from "express";
import { UNAUTHORIZED } from "../constants/http";
import { verifyJwt } from "../utils/jwt";
import { assertAppError } from "../utils/assertAppError";
import { AppErrorCode } from "../types/AppErrorCode";
import { Request, Response } from "express";

const authenticate: RequestHandler = (req: Request, res: Response, next) => {
    const token = req.cookies.accessToken as string | undefined;

    assertAppError(token != null, "No token provided", UNAUTHORIZED, AppErrorCode.MISSING_TOKEN);

    const { error, payload } = verifyJwt(token);

    assertAppError(payload != null, "Invalid token", UNAUTHORIZED, error || AppErrorCode.INVALID_TOKEN);

    req.user = { id: payload.id, role: payload.role };

    next();
};

export default authenticate;
