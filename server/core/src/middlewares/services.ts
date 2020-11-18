import { Service } from "@dashboard/service";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            services: Service[];
        }
    }
}

export function servicesMiddleware(services: Service[]) {
    return function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.services = services;

        next();
    };
}
