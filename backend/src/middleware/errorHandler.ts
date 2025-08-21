import { ErrorRequestHandler } from "express";
import { Request, Response } from "express";
import { AppError } from "../types/AppError";
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from "../constants/http";

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            code: err.errorCode,
        });
    }

    if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: err.message });
    }

    res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
};

export default errorHandler;
