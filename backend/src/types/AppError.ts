import { httpStatusCode } from "../constants/http";
import { AppErrorCode } from "./AppErrorCode";

export class AppError extends Error {
    public statusCode: httpStatusCode;
    public errorCode: AppErrorCode;

    constructor(message: string, statusCode: httpStatusCode, errorCode: AppErrorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;

        Error.captureStackTrace(this, this.constructor);
    }
}
