import { httpStatusCode } from "../constants/http";
import { AppError } from "../types/AppError";
import { AppErrorCode } from "../types/AppErrorCode";

export function assertAppError<T>(
    condition: T,
    message: string,
    statusCode: httpStatusCode,
    errorCode: AppErrorCode
): asserts condition {
    if (!condition) {
        throw new AppError(message, statusCode, errorCode);
    }
}
