import { ServiceAction } from "@dashboard/service";
import { ResponseModel } from "@dashboard/types";
import express from "express";
import { serviceActionNotFoundStatus } from "../../constants";

declare global {
    namespace Express {
        interface Request {
            action: ServiceAction;
        }
    }
}

export function serviceActionMiddleware() {
    return function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const action = req.service.actions.find(
            (action) => action.id === req.params.action
        );

        if (!action) {
            const err = serviceActionNotFoundStatus;
            const resBody: ResponseModel = {
                error: err,
            };

            return res.status(err.code).json(resBody);
        }

        req.action = action;

        return next();
    };
}
