import "express";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: string;
            username?: string;
            role?: string;
        };
        project?: {
            id: string;
            name: string;
            apiKey: string;
            createdBy: string;
        };
    }
}
