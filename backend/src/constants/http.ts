export const OK = 200;
export const CREATED = 201;
export const NO_CONTENT = 204;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;
export const CONFLICT = 409;
export const UNPROCESSABLE_ENTITY = 422;
export const TOO_MANY_REQUESTS = 429;
export const NOT_IMPLEMENTED = 501;
export const PRECONDITION_FAILED = 412;
export const BAD_GATEWAY = 502;
export const EXPECTATION_FAILED = 417;
export const METHOD_NOT_ALLOWED = 405;

export type httpStatusCode =
    | typeof OK
    | typeof CREATED
    | typeof NO_CONTENT
    | typeof BAD_REQUEST
    | typeof UNAUTHORIZED
    | typeof FORBIDDEN
    | typeof NOT_FOUND
    | typeof INTERNAL_SERVER_ERROR
    | typeof SERVICE_UNAVAILABLE
    | typeof GATEWAY_TIMEOUT
    | typeof CONFLICT
    | typeof UNPROCESSABLE_ENTITY
    | typeof TOO_MANY_REQUESTS
    | typeof NOT_IMPLEMENTED
    | typeof PRECONDITION_FAILED
    | typeof BAD_GATEWAY
    | typeof EXPECTATION_FAILED
    | typeof METHOD_NOT_ALLOWED;
