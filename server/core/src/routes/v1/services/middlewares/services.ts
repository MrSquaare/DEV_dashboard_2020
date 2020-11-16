import { Service } from "@dashboard/service";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            services: Service[];
        }
    }
}

export function servicesMiddleware(services: Service[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        req.services = services;

        next();
    };
}
