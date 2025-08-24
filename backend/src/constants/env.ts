export const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT");
export const FRONTEND_URL = getEnv("FRONTEND_URL");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const NODE_ENV = getEnv("NODE_ENV");
