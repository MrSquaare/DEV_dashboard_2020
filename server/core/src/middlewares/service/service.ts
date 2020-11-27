import { Service } from "@dashboard/service";
import { NextFunction, Request, Response } from "express";
import { serviceNotFoundStatus } from "../../constants";

declare global {
    namespace Express {
        interface Request {
            service: Service;
        }
    }
}

export function serviceMiddleware() {
    return function (req: Request, res: Response, next: NextFunction): void {
        const service = req.services.find(
            (service) => service.id === req.params.service
        );

        if (service === undefined) {
            return next(serviceNotFoundStatus);
        }

        req.service = service;

        return next();
    };
}
