import { ServiceAction } from "@dashboard/service";
import express from "express";

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
        if (req.params.action === "authentication") {
            return next();
        }

        const action = req.service.actions.find(
            (action) => action.id === req.params.action
        );

        if (action === undefined) {
            return res.status(404).send("Not found");
        }

        req.action = action;

        return next();
    };
}

export function serviceActionRequirementsMiddleware() {
    return function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.params.action === "authentication") {
            return next();
        }

        if (req.query.instance === undefined) {
            return res.status(400).send("Bad request");
        }

        return next();
    };
}
