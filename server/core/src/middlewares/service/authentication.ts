import { ResponseModel } from "@dashboard/types";
import express from "express";
import { Strategy } from "passport";
import { serviceStrategyNotFoundStatus } from "../../constants";

declare global {
    namespace Express {
        interface Request {
            strategy: Strategy;
        }
    }
}

export function authenticationServiceMiddleware() {
    return function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const strategy = req.service.strategy;

        if (!strategy) {
            const err = serviceStrategyNotFoundStatus;
            const resBody: ResponseModel = {
                error: err,
            };

            return res.status(err.code).json(resBody);
        }

        req.strategy = strategy;

        return next();
    };
}
