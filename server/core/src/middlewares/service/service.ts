import { Service } from "@dashboard/service";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            service: Service;
        }
    }
}

export function serviceMiddleware() {
    return function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const service = req.services.find(
            (service) => service.id === req.params.service
        );

        if (service === undefined) {
            return res.status(404).send("Not found");
        }

        req.service = service;

        return next();
    };
}
