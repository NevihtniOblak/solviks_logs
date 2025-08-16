export const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const NODE_ENV = getEnv("NODE_ENV");
