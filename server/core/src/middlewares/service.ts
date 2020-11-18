import { Service } from "@dashboard/service";
import { ResponseModel } from "@dashboard/types";
import express from "express";
import { serviceNotFoundStatus } from "../constants";

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
            const err = serviceNotFoundStatus;
            const resBody: ResponseModel = {
                error: err,
            };

            return res.status(err.code).json(resBody);
        }

        req.service = service;

        return next();
    };
}
