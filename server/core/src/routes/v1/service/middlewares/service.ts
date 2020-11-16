import { Service } from "@dashboard/service";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            service: Service;
        }
    }
}

export function serviceMiddleware(services: Service[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const service = services.find(
            (service) => service.id === req.params.service
        );

        if (service === undefined) {
            return res.status(404).json({
                error: "Service not found",
            });
        }

        req.service = service;

        return next();
    };
}
